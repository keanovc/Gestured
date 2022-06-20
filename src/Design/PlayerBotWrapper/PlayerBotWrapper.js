import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './PlayerBotWrapper.css';
import Paper from '../../images/icon-paper.svg';
import Scissors from '../../images/icon-scissors.svg';
import Rock from '../../images/icon-rock.svg';
import P from 'prop-types';

export const GameChoice = ({ isMachine }) => {
  const [AppState, actions] = useAppContext();
  const { playerChoice, machineChoice, score, result } = AppState;

  const title = isMachine === false ? 'you picked' : 'the house picked';

  if (!machineChoice && isMachine === true) {
    return (
      <div className={`box ${isMachine === true ? 'moveLeft' : 'moveRight'}`}>
        <h1>{title}</h1>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={`box ${isMachine === true ? 'moveLeft' : 'moveRight'}`}>
      <h1>{title}</h1>
      <div className="gameChoice" id={!isMachine ? playerChoice : machineChoice}>
        {isMachine === false && (
          <img
            src={
              playerChoice === 'rock'
                ? Rock
                : playerChoice === 'scissor'
                ? Scissors
                : playerChoice === 'paper'
                ? Paper
                : undefined
            }
          />
        )}

        {isMachine === true && (
          <img
            src={
              machineChoice === 'rock'
                ? Rock
                : machineChoice === 'scissor'
                ? Scissors
                : machineChoice === 'paper'
                ? Paper
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

GameChoice.propTypes = {
  isMachine: P.bool.isRequired,
};
