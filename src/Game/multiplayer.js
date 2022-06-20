import firebase from 'firebase/app';
import 'firebase/firestore';
import WebcamComponent from "../Webcam/WebcamComponent"

export default function Multiplayer() {

    const firebaseConfig = {
        apiKey: "AIzaSyA4hhoiITIagcoUyxaGUYxlts6VZp2LL2A",
        authDomain: "iot-rpsls.firebaseapp.com",
        projectId: "iot-rpsls",
        storageBucket: "iot-rpsls.appspot.com",
        messagingSenderId: "553938635613",
        appId: "1:553938635613:web:6ca0e8f89a9a91333e76b4"
    };

    //Server config
    const servers = {
        iceServer: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    }


    let pc = new RTCPeerConnection(servers);
    //Your webcam
    let localStream = null;
    //Other persons webcam
    let remoteStream = null;

    // HTML elements
    // const webcamButton = document.getElementById('webcamButton');
    // const webcamVideo = document.getElementById('webcamVideo');
    // const callButton = document.getElementById('callButton');
    // const callInput = document.getElementById('callInput');
    // const answerButton = document.getElementById('answerButton');
    // const remoteVideo = document.getElementById('remoteVideo');
    // const hangupButton = document.getElementById('hangupButton');

    // 1. Setup media sources

    const startLocalStream = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteStream = new MediaStream();

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // Pull tracks from remote stream, add to video stream
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        webcamVideo.srcObject = localStream;
        remoteVideo.srcObject = remoteStream;

        callButton.disabled = false;
        answerButton.disabled = false;
        webcamButton.disabled = true;
    };

    // 2. Create an offer
    const createOffer = async () => {
        // Reference Firestore collections for signaling
        const callDoc = db.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');

        callInput.value = callDoc.id;

        // Get candidates for caller, save to db
        pc.onicecandidate = (event) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await callDoc.set({ offer });

        // Listen for remote answer
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });

        hangupButton.disabled = false;
    };

    // 3. Answer the call with the unique ID
    const answer = async () => {
        const callId = callInput.value;
        const callDoc = db.collection('calls').doc(callId);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    };

    return (
        <div>
            <h2>1. Start your Webcam</h2>
            <div class="videos">
                <span>
                    <h3>Local Stream</h3>
                </span>
                <span>
                    <h3>Remote Stream</h3>
                    <video id="remoteVideo" autoplay playsinline></video>
                </span>
            </div>

            <button id="webcamButton" onClick={startLocalStream}>Start webcam</button>
            <h2>2. Create a new Call</h2>
            <button id="callButton" disabled onClick={createOffer}>Create Call (offer)</button>

            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device</p>

            <input id="callInput" />
            <button id="answerButton" onClick={answer} disabled>Answer</button>

            <h2>4. Hangup</h2>

            <button id="hangupButton" disabled>Hangup</button>
        </div>
    );
}