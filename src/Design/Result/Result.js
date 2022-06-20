import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './Result.css';

export const Result = () => {
  const [AppState, actions] = useAppContext();

  let gameResult = '';

  if (AppState.result !== '') {
    switch (AppState.result) {
      case 'W':
        gameResult = 'YOU WIN';
        break;
      case 'L':
        gameResult = 'YOU LOSE';
        break;
      case 'T':
        gameResult = 'TIE';
        break;
      default:
        gameResult = '';
        break;
    }
  }

  if (AppState.result === '') {
    return null;
  }

  return (
    <div className="resultWrapper">
      <h1 className="title">{gameResult}</h1>
      <button className={`playAgainBtn mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ${AppState.result === 'L' ? 'lose' : ''}`} onClick={() => actions.playAgain()}>
        play again
      </button>
    </div>
  );
};
