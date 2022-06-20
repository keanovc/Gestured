import React, { useEffect, useRef } from 'react';
import './Score.css';
import { useAppContext } from '../../contexts/AppContext';

export const Score = () => {
  const [AppState, actions] = useAppContext();
  let scoreClass = AppState.result === 'W' ? 'won' : AppState.result === 'L' ? 'lost' : '';
  let isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      actions.getPreviousScore();
    }

    return () => {
      isMounted.current = false;
    };
  }, [actions]);

  return (
    <div className="headerWrapper">
      <div className={`scoreWrapper ${scoreClass}`}>
        <span>Score</span>
        <h2>{AppState.score}</h2>
      </div>
    </div>
  );
};
