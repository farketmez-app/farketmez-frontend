import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// pages
import WelcomePage from "./pages/welcome-page/WelcomePage";
import ScheduleEventPage from "./pages/schedule-event-page/ScheduleEventPage";
import MyEventsPage from "./pages/my-events-page/MyEventsPage";
import PublicEventsPage from "./pages/public-events-page/PublicEventsPage";
import NearEventsPage from "./pages/near-events-page/NearEventsPage";
import AttendedEventsPage from "./pages/attended-events-page/AttendedEventsPage";
// components
import MainLayoutWithPadding from "./layouts/main-layout-with-padding/MainLayoutWithPadding";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/schedule-event",
      element: (
        <MainLayoutWithPadding>
          <ScheduleEventPage />
        </MainLayoutWithPadding>
      ),
    },
    {
      path: "/my-events",
      element: (
        <MainLayoutWithPadding>
          <MyEventsPage />
        </MainLayoutWithPadding>
      ),
    },
    {
      path: "/public-events",
      element: (
        <MainLayoutWithPadding>
          <PublicEventsPage />
        </MainLayoutWithPadding>
      ),
    },
    {
      path: "/near-events",
      element: (
        <MainLayoutWithPadding>
          <NearEventsPage />
        </MainLayoutWithPadding>
      ),
    },
    {
      path: "/attended-events",
      element: (
        <MainLayoutWithPadding>
          <AttendedEventsPage />
        </MainLayoutWithPadding>
      ),
    },
  ]);

  return (
    <div className="App">
      <AppProvider>
          <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
