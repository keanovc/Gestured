import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './PlayerBotWrapper.css';
import P from 'prop-types';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json';
import { updateUser } from '../../firebase';

export const GameChoice = ({ isMachine }) => {
  const [AppState] = useAppContext();
  const { playerChoice, machineChoice, score, result } = AppState;

  const title = isMachine === false ? 'Your Choise' : "The AI's Choise";

  const RPS_EMOJI = {
    rock:
    <EmojiProvider data={emojiData}>
      <Emoji name="raised-fist" />
    </EmojiProvider>,
    paper:
    <EmojiProvider data={emojiData}>
      <Emoji name="raised-hand" />
    </EmojiProvider>,
    scissors:
    <EmojiProvider data={emojiData}>
      <Emoji name="victory-hand" />
    </EmojiProvider>,
    lizard:
    <EmojiProvider data={emojiData}>
      <Emoji name="pinching-hand" />
    </EmojiProvider>,
    spock:
    <EmojiProvider data={emojiData}>
      <Emoji name="vulcan-salute" />
    </EmojiProvider>,
  };

  if (!machineChoice && isMachine === true) {
    return (
      <div className={`box ${isMachine === true ? 'moveLeft' : 'moveRight'}`}>
        <h1>{title}</h1>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='box'>
      <h1>{title}</h1>
      <div className="gameChoice" id={!isMachine ? playerChoice : machineChoice}>
        {isMachine === false && (
          playerChoice === 'rock'
            ? RPS_EMOJI.rock
            : playerChoice === 'scissor'
            ? RPS_EMOJI.scissors
            : playerChoice === 'paper'
            ? RPS_EMOJI.paper
            : playerChoice === 'lizard'
            ? RPS_EMOJI.lizard
            : playerChoice === 'spock'
            ? RPS_EMOJI.spock
            : undefined
        )}

        {isMachine === true && (
          machineChoice === 'rock'
            ? RPS_EMOJI.rock
            : machineChoice === 'scissor'
            ? RPS_EMOJI.scissors
            : machineChoice === 'paper'
            ? RPS_EMOJI.paper
            : machineChoice === 'lizard'
            ? RPS_EMOJI.lizard
            : machineChoice === 'spock'
            ? RPS_EMOJI.spock
            : undefined
        )}
      </div>
    </div>
  );
};

GameChoice.propTypes = {
  isMachine: P.bool.isRequired,
};
