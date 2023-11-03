import React, { createContext, useReducer } from "react";

const initialState = {
    open: false,
}

const DropdownContext = createContext({
    state: initialState,
    dispatch: () => null,
});

const mainReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_DROPDOWN":
            return {
                ...state,
                open: !state.open,
            };

        case "CLOSE_DROPDOWN":
            return {
                ...state,
                open: false,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const DropdownProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <DropdownContext.Provider value={{ state, dispatch }}>
            {children}
        </DropdownContext.Provider>
    );
};

export { DropdownContext, DropdownProvider };