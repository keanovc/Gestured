import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { RulesButton } from "../Design/RulesButton/RulesButton";
import { RulesModal } from "../Design/RulesModal/RulesModal";
import { db } from "../firebase"
import LoadingIndicator from "./LoadingIndicator";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4hhoiITIagcoUyxaGUYxlts6VZp2LL2A",
    authDomain: "iot-rpsls.firebaseapp.com",
    projectId: "iot-rpsls",
    storageBucket: "iot-rpsls.appspot.com",
    messagingSenderId: "553938635613",
    appId: "1:553938635613:web:6ca0e8f89a9a91333e76b4"
};


export default function Multiplayer() {
    const [roomCode, setRoomCode] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const [loading, setLoading] = useState(true);
    const [roundState, setRoundState] = useState({
        user: {
            emoji: '',
            result: '',
        },
        ai: {
            emoji: '',
            result: '',
        },
    });

    const handleClick = () => {

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
    const callInput = document.getElementById('callInput');

    const hangupButton = document.getElementById('hangupButton');

    // 1. Setup media sources

    const startLocalStream = async () => {
        setLoading(false);
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
        // const callDoc = db.collection('calls').doc();
        // const offerCandidates = callDoc.collection('offerCandidates');
        // const answerCandidates = callDoc.collection('answerCandidates');
        const callDoc = await addDoc(collection(db, "calls"), {});
        const offerCandidates = await addDoc(collection(callDoc, "offerCandidates"), {});
        const answerCandidates = await addDoc(collection(callDoc, "anwserCandidates"), {});

        setRoomCode(callDoc.id);


        // Get candidates for caller, save to db
        //event.candidate.toJSON()
        pc.onicecandidate = async (event) => {
            const docRef = doc(db, "calls", callDoc.id, "offerCandidates", offerCandidates.id);
            event.candidate && await addDoc(doc(docRef), event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await setDoc(doc(db, 'calls', callDoc.id), { offer })

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
        <>
            <Navbar />
            <section className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-xl w-full">
                <div className="text-center flex items-center justify-between gap-20">
                    <div className='w-1/2'>
                        {/* <h5 className='my-5'>
                You
                {` ${roundState.user.result}`}
              </h5> */}

                        <div className="py-0 flex justify-center flex-col items-center gap-3">
                            <div className='rounded-full overflow-hidden w-[400px] h-[400px]'>

                                {loading ? (
                                    <div className='bg-black w-[400px] h-[400px] flex justify-center items-center'>
                                        <LoadingIndicator
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                ) :
                                    <video autoPlay={true} id='localFeed' className="h-full w-full object-cover" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className="py-0 flex justify-center flex-col items-center gap-3">
                            <div className='rounded-full overflow-hidden w-[400px] h-[400px]'>

                                {!remoteStream ? (
                                    <div className='bg-black w-[400px] h-[400px] flex justify-center items-center'>
                                        <LoadingIndicator
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                ) :
                                    <video autoPlay={true} id='remoteFeed' />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 mx-auto w-[880px] mt-10'>
                    <div className='flex justify-center'>
                        {roundState.user.emoji}
                    </div>
                    <div className='flex justify-center'>
                        {roundState.ai.emoji}
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="cursor-pointer mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                        onClick={startLocalStream}
                    >
                        Play
                    </button>
                </div>
                <div className="flex flex-row items-center">
                    <button onClick={createOffer} disabled={loading} type="button" className={`${loading ? 'opacity-50 mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition' : "cursor-pointer mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"} `}>
                        create room
                    </button>
                    <input value={roomCode} disabled={loading} placeholder="room code" className={`${loading ? 'opacity-50 w-80 ml-8 mr-8 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition text-center' : "text-center w-80 ml-8 mr-8 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transitiont"} `}>

                    </input>
                    <button onClick={answer} disabled={loading} type="button" className={`${loading ? 'opacity-50 mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition' : "cursor-pointer mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"} `}>
                        join room
                    </button>
                </div>
            </section>

            <RulesButton text={'rules'} toggle={toggleModal} />
            {showModal && <RulesModal text={'rules'} show={showModal} toggle={toggleModal} />}
        </>
    );
}