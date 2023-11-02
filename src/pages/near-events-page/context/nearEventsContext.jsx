import React, { createContext, useReducer } from "react";

const initialState = {
  plainEventWantedToBeSeen: null,
};

const NearEventsContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAIN_EVENT_WANTED_TO_BE_SEEN":
      return {
        ...state,
        plainEventWantedToBeSeen: action.payload,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const NearEventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <NearEventsContext.Provider value={{ state, dispatch }}>
      {children}
    </NearEventsContext.Provider>
  );
};

export { NearEventsContext, NearEventsProvider };
