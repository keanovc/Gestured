import React, { useEffect, useState, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import { EmojiProvider, Emoji } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/src/data.json'
import LoadingIndicator from './LoadingIndicator';
import Navbar from '../Navbar/Navbar';
import { RulesButton } from '../Design/RulesButton/RulesButton';
import { RulesModal } from '../Design/RulesModal/RulesModal';
import { WebcamComponent } from '../Webcam/WebcamComponent';
import ConfettiComponent from '../Design/ConfettiComponent/ConfettiComponent';
import LocalCamScore from './LocalCamScore';

export default function Game() {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
    };

  const PROVIDED_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/xHyJKmLEI/';
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
      <Emoji name="victory-hand" />
    </EmojiProvider>,
    lizard:
    <EmojiProvider data={emojiData}>
      <Emoji name="pinching-hand" />
    </EmojiProvider>,
    spock:
    <EmojiProvider data={emojiData}>
      <Emoji name="vulcan-salute" />
    </EmojiProvider>,
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

  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [resultText, setResultText] = useState('');

  const calculateRoundResult = (userHand, AIHand) => {
    if (userHand === 'scissors' && (AIHand === 'paper' || AIHand === 'lizard')) {
      setScore(score + 1);
      setResult('W');
      setResultText('You win!');
      localStorage.setItem('score', score);
      return <ConfettiComponent />;
    } else if (userHand === 'paper' && (AIHand === 'rock' || AIHand === 'spock')) {
      setScore(score + 1);
      setResult('W');
      setResultText('You win!');
      localStorage.setItem('score', score);
      return <ConfettiComponent />;
    } else if (userHand === 'rock' && (AIHand === 'lizard' || AIHand === 'scissors')) {
      setScore(score + 1);
      setResult('W');
      setResultText('You win!');
      localStorage.setItem('score', score);
      return <ConfettiComponent />;
    } else if (userHand === 'lizard' && (AIHand === 'spock' || AIHand === 'paper')) {
      setScore(score + 1);
      setResult('W');
      setResultText('You win!');
      localStorage.setItem('score', score);
      return <ConfettiComponent />;
    } else if (userHand === 'spock' && (AIHand === 'scissors' || AIHand === 'rock')) {
      setScore(score + 1);
      setResult('W');
      setResultText('You win!');
      localStorage.setItem('score', score);
      return <ConfettiComponent />;
    } else if (userHand === AIHand) {
      setResult('T');
      setResultText('Tie!');
      localStorage.setItem('score', score);
    } else {
      setScore(0);
      setResult('L');
      setResultText('You lose!');
      localStorage.setItem('score', 0);
    }
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
  const loop = () => {
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
        // result: calculateRoundResult(aiHand, userHand),
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
    {roundState.user.result}
    <Navbar />
    <section className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-xl w-full">
    <LocalCamScore score={score} result={result} />
      <div className="text-center flex items-center justify-between gap-20">
        <div className='w-1/2'>
          {/* <h5 className='my-5'>
            You
            {` ${roundState.user.result}`}
          </h5> */}

          <div className="py-0 flex justify-center flex-col items-center gap-3">
          <div className='rounded-full overflow-hidden w-[400px] h-[400px]'>

            {!initialState.webcam ? (
              <div className='bg-black w-[400px] h-[400px] flex justify-center items-center'>
                <LoadingIndicator
                  width={200}
                  height={200}
                />
              </div>
            ) :
                <WebcamComponent />
              }
            </div>
          </div>
          <div className='flex justify-center mt-10 h-20'>
            { roundState.user.emoji }
          </div>
        </div>
        <h1 className='text-black text-5xl whitespace-nowrap w-80'>
          {resultText}
        </h1>
        <div className='w-1/2'>
          <div className='w-[400px] h-[400px]'>
            <img src="../../img/robot1.png" alt="AI" title="AI" className="flex-grow" />
          </div>
          <div className='flex justify-center mt-10 h-20'>
            {roundState.ai.emoji}
          </div>
        </div>
      </div>
        <div>
          <button
            type="button"
            className="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            disabled={!initialState.webcam}
            onClick={handleClick}
          >
            Play
          </button>
        </div>
    </section>

    <RulesButton text={'rules'} toggle={toggleModal} />
    {showModal && <RulesModal text={'rules'} show={showModal} toggle={toggleModal} />}

    </>
  );
}