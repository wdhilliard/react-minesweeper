import React, { createContext, useReducer, useEffect } from 'react';
import { useActions } from './actions';
import { initialState, reducer } from './reducer';
import { useThunkReducer } from 'react-hook-thunk-reducer';

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
  // Get state and dispatch from Reacts new API useReducer.
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  // Log new state
  useEffect(() => {
    console.log({ newState: state });
  }, [state]);
  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider value={{ state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
