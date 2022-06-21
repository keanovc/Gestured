import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './GameWrapper.css';
import { Result } from '../Result/Result';
import { GameChoice } from '../PlayerBotWrapper/PlayerBotWrapper';
import { updateUser } from '../../firebase';

export const GameWrapper = () => {
  const [AppState, actions] = useAppContext();
  const { score, result } = AppState;

  useEffect(() => {
    let timer = setTimeout(() => {
      actions.machineChoice();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [actions]);

  useEffect(() => {
    updateUser(score, 'buttons', result);
  }
  , [score, result]);

  return (
    <>
      <div className="boxesWrapper">
        <GameChoice isMachine={false} />
        <Result />
        <GameChoice isMachine={true} />
      </div>
    </>
  );
};
