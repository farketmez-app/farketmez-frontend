import React from "react";
import "./main-layout.css";
import Header from "../../components/header/header";
import PageSwitcher from "../components/page-switcher/PageSwitcher";

function MainLayoutWithPadding({ children, hasPadding = true }) {
  return (
    <div
      className={`main-layout 
    ${hasPadding ? "main-layout--with-padding" : ""}
    `}
    >
      <Header />
      <PageSwitcher />

      <div className="main-layout__content">{children}</div>
    </div>
  );
}

export default MainLayoutWithPadding;
