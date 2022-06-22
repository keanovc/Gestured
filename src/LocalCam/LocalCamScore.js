import React, { useEffect, useRef, useState } from 'react'
import { Emoji, EmojiProvider } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json'
import '../Design/Score/Score.css'
import { updateUser } from '../firebase';

const LocalCamScore = ({score}) => {

  if (score) {
    updateUser(score, "webcam", result);
  }

  return (
    <div className="headerWrapper">
      <div className={`scoreWrapper`}>
        <span>Score</span>
        <div className='inline-flex items-center'>
        <h2>{score}</h2>
        { score >= 3 ?
            <EmojiProvider data={emojiData}>
              <Emoji className='w-8' name="fire" />
            </EmojiProvider>
          : null }
          </div>
      </div>
    </div>
  );
}

export default LocalCamScore