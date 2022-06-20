import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ChoicesWrapper } from '../ChoicesWrapper/ChoicesWrapper';
import { GameWrapper } from '../GameWrapper/GameWrapper';

export const  GameLayout = () => {
  const [AppState] = useAppContext();

  if (AppState.playerChoice) {
    return <GameWrapper />;
  }

  return <ChoicesWrapper />;
};
