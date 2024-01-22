import React, { createContext, useReducer } from "react";

console.log(localStorage.getItem("selected-interests"));

const initialState = {
  user: {
    email: localStorage.getItem("email") || null,
    id: localStorage.getItem("id") || null,
    userHasSelectedInterests:
      localStorage.getItem("selected-interests") || false,
  },

  loading: false,
  eventCreated: false,
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_USER_HAS_SELECTED_INTERESTS":
      return {
        ...state,
        user: { ...state.user, userHasSelectedInterests: action.payload },
      };

    case "LOGOUT":
      return {
        ...state,
        user: {
          id: null,
          email: null,
          userHasSelectedInterests: false,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_EVENT_CREATED":
      return {
        ...state,
        eventCreated: action.payload,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

// usage in any component
// import { AppContext } from '../../context/AppContext';
//
// function SomeComponent() {
//   const { state, dispatch } = useContext(AppContext);
//
//   return (
//     <div>SomeComponent</div>
//   );
// }
//
// export default SomeComponent;
