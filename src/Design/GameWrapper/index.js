import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './styles.css';
import { ResultBox } from '../ResultBox';
import { GameChoice } from '../PlayerChoiceWrapper';

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
      <ResultBox />
      <GameChoice isMachine={true} />
    </div>
  );
};
