import React, { useEffect, useState, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import { EmojiProvider, Emoji } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/src/data.json'

import MutedText from './MutedText';
import LoadingIndicator from './LoadingIndicator';
import Navbar from '../Navbar/Navbar';
import { OutlineButton } from '../Design/OutlineButton';
import { Modal } from '../Design/Modal';
import { useWebcamContext } from '../Webcam/WebcamComponent';

export default function Game() {

  const { ref } = useWebcamContext();
  console.log(ref);

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
    };

  const PROVIDED_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/-RxweLcY_/';
  const RPS_EMOJI = {
    rock:
    <EmojiProvider data={emojiData}>
      <Emoji name="raised-fist" />
    </EmojiProvider>,
    paper:
    <EmojiProvider data={emojiData}>
      <Emoji name="raised-hand" />
    </EmojiProvider>,
    scissors:
    <EmojiProvider data={emojiData}>
      <Emoji name="hand-with-fingers-splayed" />
    </EmojiProvider>,
  };
  const HAND_TO_NUMBER = {
    rock: 0,
    paper: 1,
    scissors: 2,
  };

  const webcamRef = useRef();
  const [initialState, setInitialState] = useState({
    model: null,
    webcam: null,
    maxPredictions: null,
  });
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

  const calculateRoundResult = (leftHand, rightHand) => {
    const leftNumber = HAND_TO_NUMBER[leftHand];
    const rightNumber = HAND_TO_NUMBER[rightHand];

    if ((leftNumber + 1) % 3 === rightNumber) {
      return 'Lose';
    }
    if ((leftNumber + 2) % 3 === rightNumber) {
      return 'Win';
    }
    return 'Draw';
  };

  const predict = async () => {
    // predict can take in an image, video or canvas html element
    const predictions = await initialState.model.predict(initialState.webcam.canvas);
    const result = new Map();
    [...new Array(initialState.maxPredictions)].forEach((item, index) => {
      const { className } = predictions[index];
      const probability = parseFloat(predictions[index].probability.toFixed(2));
      result.set(className, probability);
    });
    const max = [...result.entries()].reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc));
    return {
      prediction: {
        className: max[0],
        probability: max[1],
      },
      classes: [...result.keys()],
    };
  };

  async function loop() {
    initialState.webcam.update(); // update the webcam frame
    // await predict();
    window.requestAnimationFrame(loop);
  }

  const init = async () => {
    const modelURL = `${PROVIDED_MODEL_URL}model.json`;
    const metadataURL = `${PROVIDED_MODEL_URL}metadata.json`;

    const model = await tmImage.load(modelURL, metadataURL);
    const maxPredictions = model.getTotalClasses();

    const webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    await model.predict(webcam.canvas);

    setInitialState({
      ...initialState,
      model,
      webcam,
      maxPredictions,
    });
  };

  const handleClick = async () => {
    const result = await predict();
    const userHand = result.prediction.className;
    const aiHand = result.classes[Math.floor(Math.random() * result.classes.length)];
    setRoundState({
      user: {
        emoji: RPS_EMOJI[userHand],
        result: calculateRoundResult(userHand, aiHand),
      },
      ai: {
        emoji: RPS_EMOJI[aiHand],
        result: calculateRoundResult(aiHand, userHand),
      },
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!initialState.model || !initialState.webcam || !initialState.maxPredictions) {
      return;
    }
    window.requestAnimationFrame(loop);
    // webcamRef.current.appendChild(initialState.webcam.canvas);
  }, [initialState, webcamRef, loop]);

  return (
    <>
    <Navbar />
    <section className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-xl h-screen">
      <div className="container mx-auto text-center flex gap-3">
        <div>
          <h5 className='my-5'>
            You
            {` ${roundState.user.result}`}
          </h5>
          <div className="py-0 flex justify-center flex-col items-center gap-3">
            {!initialState.webcam ? (
              <LoadingIndicator
                width={200}
                height={200}
              />
            ) : null}
            {/* <div ref={webcamRef} /> */}
            {/* <WebcamContainer /> */}
            <p className="text-2xl">{roundState.user.emoji}</p>
          </div>
        </div>
        <p>
          VS
        </p>
        <div>
          <h5>
            AI
            {` ${roundState.ai.result}`}
          </h5>
          <div>
            <div className="flex justify-center">

              {roundState.ai.emoji}
            </div>
          </div>
        </div>
      </div>
        <div>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
            disabled={!initialState.webcam}
            onClick={handleClick}
          >
            play
          </button>
        </div>
    </section>

    <OutlineButton text={'rules'} toggle={toggleModal} />
    {showModal && <Modal text={'rules'} show={showModal} toggle={toggleModal} />}

    </>
  );
}