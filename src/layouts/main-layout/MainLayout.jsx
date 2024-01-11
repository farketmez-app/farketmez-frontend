import React, { useContext, useEffect } from "react";
import "./main-layout.css";
import Header from "../../components/header/header";
import PageSwitcher from "../components/page-switcher/PageSwitcher";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import SignupInterestSelection from "../../components/SignUp/components/signup-interest-selection/SignupInterestSelection";

function MainLayoutWithPadding({
  children,
  hasPadding = true,
  shouldShowSwitcher = true,
}) {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/");
    }

    if (state.user && !state.user.userSelectedInterests) {
      dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
      dispatch({ type: "SET_MODAL_TITLE", payload: "İlgi Alanlarını Seç" });
      dispatch({
        type: "SET_MODAL_CONTENT",
        payload: <SignupInterestSelection />,
      });
      dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
    }
  }, [state.user, navigate, dispatch]);

  return (
    <div
      className={`main-layout 
    ${hasPadding ? "main-layout--with-padding" : ""}
    `}
    >
      <Header />
      {shouldShowSwitcher && <PageSwitcher />}

      <div className="main-layout__content">{children}</div>
    </div>
  );
}

export default MainLayoutWithPadding;
