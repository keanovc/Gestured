import * as actionType from './actionsTypes';

export const buildActions = (dispatch) => {
  return {
    playerChoice: (choice) => dispatch({ type: actionType.PLAYER_CHOICE, payload: choice }),
    machineChoice: () => {
      dispatch({ type: actionType.MACHINE_CHOICE });
      dispatch({ type: actionType.GAME_RESULT });
    },
    playAgain: () => dispatch({ type: actionType.PLAY_AGAIN }),
    getPreviousScore: () => dispatch({ type: actionType.GET_PREVIOUS_SCORE }),
  };
};
