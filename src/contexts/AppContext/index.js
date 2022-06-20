import React, { createContext, useContext, useReducer, useRef } from 'react';
import { buildActions } from './buildActions';
import { initialState } from './initialState';
import { reducer } from './reducer';
import P from 'prop-types';

const Context = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useRef(buildActions(dispatch));
  return <Context.Provider value={[state, actions.current]}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  const context = useContext(Context);

  if (typeof context === 'undefined') {
    throw new Error('YOU HAVE TO USE useAppContext INSIDE <AppContextProvider/>');
  }

  return [...context];
};

AppContextProvider.propTypes = {
  children: P.node.isRequired,
};
