import React, { useEffect, useRef } from 'react';
import './style.css';
import Logo from '../../images/logo.svg';
import { useAppContext } from '../../contexts/AppContext';

export const Header = () => {
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
      <div className="titlesWrapper">
        <img src={Logo} />
      </div>
      <div className={`scoreWrapper ${scoreClass}`}>
        <span>Score</span>
        <h2>{AppState.score}</h2>
      </div>
    </div>
  );
};
