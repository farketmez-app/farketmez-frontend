import React, { useEffect } from "react";
import "./main-page.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function MainPage() {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user === null) {
      navigate("/welcome");
    }
  }, [state.user, navigate]);

  return (
	<div>
	  <Header />
	  MainPage
	  <Footer/>
	</div>
 );
}

export default MainPage;
