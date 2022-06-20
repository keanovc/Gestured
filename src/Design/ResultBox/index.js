import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './styles.css';

export const ResultBox = () => {
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
      <button className={`playAgainBtn ${AppState.result === 'L' ? 'lose' : ''}`} onClick={() => actions.playAgain()}>
        play again
      </button>
    </div>
  );
};
