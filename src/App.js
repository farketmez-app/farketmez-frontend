import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./pages/welcome-page/WelcomePage";
import SignInPage from "./pages/sign-in-page/SignInPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import MainPage from "./pages/main-page/MainPage";
import ActivitiesListPage from "./pages/activities-list-page/ActivitiesListPage";
import NewActivityPage from "./pages/new-activity-page/NewActivityPage";
import ResultPage from "./pages/result-page/ResultPage";
import RateActivityPage from "./pages/rate-activity-page/RateActivityPage";
import { AppProvider } from "./context/AppContext";
import { ModalProvider } from "./context/ModalContext";
import FarketmezModal from "./components/farketmez-modal/FarketmezModal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/welcome",
      element: <WelcomePage />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/my-own-activities",
      element: <ActivitiesListPage list={"my-own"} />,
    },
    {
      path: "/system-activities",
      element: <ActivitiesListPage list={"system"} />,
    },
    {
      path: "/add-new-activity",
      element: <NewActivityPage />,
    },
    {
      path: "/result",
      element: <ResultPage />,
    },
    {
      path: "/rate-activity/:id",
      element: <RateActivityPage />,
    },
  ]);

  return (
    <div className="App">
      <AppProvider>
        <ModalProvider>
          <RouterProvider router={router} />

          <FarketmezModal />
        </ModalProvider>
      </AppProvider>
    </div>
  );
}

export default App;
