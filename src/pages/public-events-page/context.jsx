import { createContext, useReducer } from "react";

const initialState = {
  events: [],
  fetching: false,
  searchInput: "",
  searching: false,
  filtering: {
    cost: "all",
    place: "all",
    priority: "attendance",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "SET_FETCHING":
      return {
        ...state,
        fetching: action.payload,
      };
    case "SET_SEARCH_INPUT":
      return {
        ...state,
        searchInput: action.payload,
      };

    case "SET_SEARCHING":
      return {
        ...state,
        searching: action.payload,
      };

    case "SET_FILTERING":
      return {
        ...state,
        filtering: action.payload,
      };

    default:
      return state;
  }
};

const EventsContext = createContext(initialState);

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
