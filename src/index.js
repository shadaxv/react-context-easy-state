import React, { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';

export const contexts = new Map();

export const StateProvider = ({
  contextName,
  reducer,
  initialState,
  children
}) => {
  let StateContext = contexts.get(contextName);

  if (!StateContext) {
    StateContext = createContext();
    contexts.set(contextName, StateContext);
  }

  useEffect(() => {
    return () => {
      contexts.delete(contextName);
    }
  }, [contextName]);

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};
StateProvider.propTypes = {
  /**
   * @return {React.Node}
   */
  children: PropTypes.node.isRequired,
  
  contextName: PropTypes.string.isRequired,

  /**
   * Object containing initial state value.
   */
  initialState: PropTypes.shape({}).isRequired,

  /**
   * @param {object} state
   * @param {object} action
   */
  reducer: PropTypes.func.isRequired
};

export const useStateValue = (name) => useContext(contexts.get(name));
