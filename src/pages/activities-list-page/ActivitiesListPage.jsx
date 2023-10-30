import React from "react";
import "./activities-list-page.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function ActivitiesListPage({ list }) {
  // list is either "my-own" or "system", fetch data accordingly

  return (
	<div>
	  <Header />
	  ActivitiesListPage
	  <Footer/>
	</div>
 );
}

export default ActivitiesListPage;
