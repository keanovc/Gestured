import { imag } from "@tensorflow/tfjs";
import { db } from "../firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA4hhoiITIagcoUyxaGUYxlts6VZp2LL2A",
    authDomain: "iot-rpsls.firebaseapp.com",
    projectId: "iot-rpsls",
    storageBucket: "iot-rpsls.appspot.com",
    messagingSenderId: "553938635613",
    appId: "1:553938635613:web:6ca0e8f89a9a91333e76b4"
};




export default function Multiplayer() {

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
    const callInput = document.getElementById('callInput');

    const hangupButton = document.getElementById('hangupButton');

    // 1. Setup media sources

    const startLocalStream = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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
        const webcamVideo = document.getElementById('localFeed');
        webcamVideo.srcObject = localStream;

        const remoteVideo = document.getElementById('remoteFeed');
        remoteVideo.srcObject = remoteStream;
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
            <div className="flex items-center justify-around flex-row">
                <div className="flex items-center justify-evenly flex-col">
                    <p className="text-white text-2xl font-semibold mb-4">You</p>
                    <div className="w-[400px] h-[400px] rounded-full overflow-hidden bg-slate-400">
                        <video className="w-full h-full object-cover" id='localFeed' autoPlay={true}>
                        </video>
                    </div>
                </div>
                <div className="flex items-center justify-evenly flex-col">
                    <p className="text-white text-2xl font-semibold mb-4">Opponent</p>
                    <div className="w-[400px] h-[400px] rounded-full overflow-hidden bg-slate-400">
                        <video className="w-full h-full object-cover" id='remoteFeed' autoPlay={true}>
                        </video>
                    </div>
                </div>
            </div>

            <button id="webcamButton" className="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out " onClick={startLocalStream}>Start</button>
            <h2>2. Create a new Call</h2>
            <button id="callButton" onClick={createOffer}>Create Call (offer)</button>

            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device</p>

            <input id="callInput" />
            <button id="answerButton" onClick={answer} >Answer</button>

            <h2>4. Hangup</h2>

            <button id="hangupButton" >Hangup</button>
        </div >
    );
}