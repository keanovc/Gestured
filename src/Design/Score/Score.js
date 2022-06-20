import React, { useEffect, useRef } from 'react';
import './Score.css';
import { useAppContext } from '../../contexts/AppContext';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json'

export const Score = () => {
  const [AppState, actions] = useAppContext();
  const { score, result } = AppState;
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
        <div className='inline-flex items-center'>
          <h2>{AppState.score}</h2>
          { score >= 3 ?
            <EmojiProvider data={emojiData}>
              <Emoji className='w-8' name="fire" />
            </EmojiProvider>
          : null }
        </div>
      </div>
    </div>
  );
};
