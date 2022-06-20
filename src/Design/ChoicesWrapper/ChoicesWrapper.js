import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import './ChoicesWrapper.css';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/src/data.json'

export const ChoicesWrapper = () => {
  const [AppState, actions] = useAppContext();

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

  return (
    <div className="wrapper">
      <div className="choicesWrapper">
        <div className="choice" id="paper" onClick={() => actions.playerChoice('paper')}>
          {RPS_EMOJI.paper}
        </div>

        <div className="choice" id="scissors" onClick={() => actions.playerChoice('scissor')}>
          {RPS_EMOJI.scissors}
        </div>

        <div className="choice" id="rock" onClick={() => actions.playerChoice('rock')}>
          {RPS_EMOJI.rock}
        </div>

        <div className="choice" id="lizard" onClick={() => actions.playerChoice('lizard')}>
          {RPS_EMOJI.lizard}
        </div>

        <div className="choice" id="spock" onClick={() => actions.playerChoice('spock')}>
          {RPS_EMOJI.spock}
        </div>
      </div>
    </div>
  );
};
