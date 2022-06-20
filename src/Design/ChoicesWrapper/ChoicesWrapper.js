import React from 'react';
import Triangle from '../../images/bg-triangle.svg';
import Paper from '../../images/icon-paper.svg';
import Scissors from '../../images/icon-scissors.svg';
import Rock from '../../images/icon-rock.svg';
import { useAppContext } from '../../contexts/AppContext';
import './ChoicesWrapper.css';

export const ChoicesWrapper = () => {
  const [AppState, actions] = useAppContext();

  return (
    <div className="wrapper">
      <div className="choicesWrapper">
        <img src={Triangle} id="triangle" />

        <div className="choice" id="paper" onClick={() => actions.playerChoice('paper')}>
          <img src={Paper} alt="paperIcon" />
        </div>

        <div className="choice" id="scissors">
          <img src={Scissors} alt="ScissorsIcon" onClick={() => actions.playerChoice('scissor')} />
        </div>

        <div className="choice" id="rock">
          <img src={Rock} alt="RockIcon" onClick={() => actions.playerChoice('rock')} />
        </div>
      </div>
    </div>
  );
};
