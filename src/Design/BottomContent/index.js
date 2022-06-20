import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ChoicesWrapper } from '../ChoicesWrapper';
import { GameWrapper } from '../GameWrapper';

export const Bottom = () => {
  const [AppState] = useAppContext();

  if (AppState.playerChoice) {
    return <GameWrapper />;
  }

  return <ChoicesWrapper />;
};
