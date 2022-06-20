import * as actionsTypes from './actionsTypes';

export const reducer = (state, action) => {
  switch (action.type) {
    case actionsTypes.PLAYER_CHOICE: {
      return { ...state, playerChoice: action.payload };
    }
    case actionsTypes.MACHINE_CHOICE: {
      const choice = Math.floor(Math.random() * 5);
      switch (choice) {
        case 0:
          return { ...state, machineChoice: 'paper' };

        case 1:
          return { ...state, machineChoice: 'scissor' };

        case 2:
          return { ...state, machineChoice: 'rock' };

        case 3:
          return { ...state, machineChoice: 'lizard' };

        case 4:
          return { ...state, machineChoice: 'spock' };

        default:
          return { ...state };
      }
    }
    case actionsTypes.GAME_RESULT: {
      const playerChose = state.playerChoice;
      const machineChose = state.machineChoice;
      let currentScore = state.score;

      if (playerChose === 'scissor' && (machineChose === 'paper' || machineChose === 'lizard')) {
        const newScore = ++currentScore;
        localStorage.setItem('score', newScore);
        return { ...state, result: 'W', score: newScore };
      } else if (playerChose === 'paper' && (machineChose === 'rock' || machineChose === 'spock')) {
        const newScore = ++currentScore;
        localStorage.setItem('score', newScore);
        return { ...state, result: 'W', score: newScore };
      } else if (playerChose === 'rock' && (machineChose === 'lizard' || machineChose === 'scissor')) {
          const newScore = ++currentScore;
          localStorage.setItem('score', newScore);
          return { ...state, result: 'W', score: newScore };
      } else if (playerChose === 'lizard' && (machineChose === 'spock' || machineChose === 'paper')) {
          const newScore = ++currentScore;
          localStorage.setItem('score', newScore);
          return { ...state, result: 'W', score: newScore };
      } else if (playerChose === 'spock' && (machineChose === 'scissor' || machineChose === 'rock')) {
          const newScore = ++currentScore;
          localStorage.setItem('score', newScore);
          return { ...state, result: 'W', score: newScore };
      } else if (playerChose === machineChose) {
        localStorage.setItem('score', currentScore);
        return { ...state, result: 'T', score: currentScore };
      } else {
        const newScore = --currentScore;

        if (newScore === 0 || newScore < 0) {
          localStorage.setItem('score', 0);
          return { ...state, result: 'L', score: 0 };
        }
        localStorage.setItem('score', newScore);
        return { ...state, result: 'L', score: newScore };
      }
    }

    case actionsTypes.PLAY_AGAIN: {
      return { ...state, playerChoice: false, machineChoice: false, result: '' };
    }

    case actionsTypes.GET_PREVIOUS_SCORE: {
      const SavedScore = localStorage.getItem('score');

      if (SavedScore === null) {
        localStorage.setItem('score', 0);
        return { ...state, score: 0 };
      }

      return { ...state, score: SavedScore };
    }

    default:
      return { ...state };
  }
};
