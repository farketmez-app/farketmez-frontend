import React, { useContext, useEffect } from "react";
import "./main-layout.css";
import Header from "../../components/header/header";
import PageSwitcher from "../components/page-switcher/PageSwitcher";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function MainLayoutWithPadding({
  children,
  hasPadding = true,
  shouldShowSwitcher = true,
}) {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/");
    }
  } , [state.user, navigate]);

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
