import React, { createContext, useReducer } from "react";

const initialState = {
  user: {
    id:"Dh24FCZWTHsaIjNhwN",
    username: "test",
    //... other user data
  },
  loading: false,
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
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
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
