import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './GameWrapper.css';
import { Result } from '../Result/Result';
import { GameChoice } from '../PlayerBotWrapper/PlayerBotWrapper';

export const GameWrapper = () => {
  const [AppState, actions] = useAppContext();
  const { playerChoice, machineChoice, score, result } = AppState;

  useEffect(() => {
    let timer = setTimeout(() => {
      actions.machineChoice();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [actions]);

  return (
    <div className="boxesWrapper">
      <GameChoice isMachine={false} />
      <Result />
      <GameChoice isMachine={true} />
    </div>
  );
};
