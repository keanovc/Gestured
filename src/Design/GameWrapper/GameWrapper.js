import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './GameWrapper.css';
import { Result } from '../Result/Result';
import { GameChoice } from '../PlayerBotWrapper/PlayerBotWrapper';
import { updateUser } from '../../firebase';

export const GameWrapper = () => {
  const [AppState, actions] = useAppContext();
  const { score, result } = AppState;

  console.log(AppState);

  useEffect(() => {
    let timer = setTimeout(() => {
      actions.machineChoice();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [actions]);

  if (result) {
    updateUser(score, "buttons", result);
  }

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
