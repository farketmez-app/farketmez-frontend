import React, { useEffect } from "react";
import "./main-page.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user === null) {
      navigate("/welcome");
    }
  }, [state.user, navigate]);

  return <div>MainPage</div>;
}

export default MainPage;
