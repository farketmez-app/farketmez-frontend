import React, { createContext, useReducer } from "react";

const initialState = {
  title: "",
  modalContent: null, // React.ReactNode
  visible: false,
  shouldShowLogo: true,
  shouldCloseOnOverlayClick: false,
  hasSpesifiedHeight: true,

};

const ModalContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state, action) => {
  switch (action.type) {
    // usage: dispatch({ type: "SET_MODAL_TITLE", payload: "Farketmez Modal Title" });
    case "SET_MODAL_TITLE":
      return {
        ...state,
        title: action.payload,
      };

    // usage: dispatch({ type: "SET_MODAL_CONTENT", payload: <div>SomeComponent</div> });
    case "SET_MODAL_CONTENT":
      return {
        ...state,
        modalContent: action.payload,
      };

    // usage: dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    case "TOGGLE_MODAL_VISIBILITY":
      return {
        ...state,
        visible: action.payload,
      };

    // usage: dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
    case "SET_MODAL_SHOULD_SHOW_LOGO":
      return {
        ...state,
        shouldShowLogo: action.payload,
      };

    // usage: dispatch({ type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK", payload: true });
    case "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK":
      return {
        ...state,
        shouldCloseOnOverlayClick: action.payload,
      };

    // usage: dispatch({ type: "SET_MODAL_HAS_SPESIFIED_HEIGHT", payload: true });
    case "SET_MODAL_HAS_SPESIFIED_HEIGHT":
      return {
        ...state,
        hasSpesifiedHeight: action.payload,
      };

    case "RESET_MODAL":
      return {
        ...initialState,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

/**
 * usage in any component
 * import { ModalContext } from '../../context/ModalContext';
 *
 * function SomeComponent() {
 *  const { state, dispatch } = useContext(ModalContext);  // state is like { modalContent: null, visible: false }, dispatch is a function
 *
 * return (
 *  <div>SomeComponent</div>
 * );
 *
 * export default SomeComponent;
 *
 * // to toggle modal visibility
 * dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
 *
 * // to set modal content
 * dispatch({ type: "SET_MODAL_CONTENT", payload: <div>SomeComponent</div> });
 *
 * // to reset modal content
 * dispatch({ type: "SET_MODAL_CONTENT", payload: null });
 *
 */
