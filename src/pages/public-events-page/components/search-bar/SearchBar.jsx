import React, { useContext, useEffect, useMemo, useState } from "react";
import "./search-bar.css";
import EventsContext from "../../context";
import debounce from "lodash.debounce";

import SearchIcon from "../../../../assets/icons/search.svg";

function SearchBar() {
  const { state, dispatch } = useContext(EventsContext);
  const [searchTerm, setSearchTerm] = useState("");

  async function search(criteria) {
    fetch(`http://localhost:8080/events/search?query=${criteria}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok && response.status === 404) {
          dispatch({ type: "SET_EVENTS", payload: [] });
          return;
        }

        return response.json();
      })
      .then((data) => {
        dispatch({ type: "SET_EVENTS", payload: data });
      });
  }

  const debouncedSearch = useMemo(() => debounce(search, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

  console.log(state.searching)

  function handleChanges(e) {
    if (e.target.value === "") {
      dispatch({ type: "SET_SEARCHING", payload: false });
      return;
    }

    dispatch({ type: "SET_SEARCHING", payload: true });

    setSearchTerm(e.target.value);
  }

  return (
    <div className="search-bar">
      <img src={SearchIcon} alt="search icon" />
      <input type="text" onChange={(e) => handleChanges(e)} />
    </div>
  );
}

export default SearchBar;
