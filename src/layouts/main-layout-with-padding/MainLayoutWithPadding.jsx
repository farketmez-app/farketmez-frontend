import React from "react";
import "./main-layout-with-padding.css";
import Heading from "../../components/heading/Heading";

function MainLayoutWithPadding({ children }) {
  return (
    <div className="main-layout-with-padding">
      <Heading />

      <div className="main-layout-with-padding__content">{children}</div>
    </div>
  );
}

export default MainLayoutWithPadding;
