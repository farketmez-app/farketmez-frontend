import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import { ModalProvider } from "./context/ModalContext";
import FarketmezModal from "./components/farketmez-modal/FarketmezModal";

// pages
import WelcomePage from "./pages/welcome-page/WelcomePage";
import ScheduleEventPage from "./pages/schedule-event-page/ScheduleEventPage";
import MyEventsPage from "./pages/my-events-page/MyEventsPage";
import PublicEventsPage from "./pages/public-events-page/PublicEventsPage";
import NearEventsPage from "./pages/near-events-page/NearEventsPage";
import AttendedEventsPage from "./pages/attended-events-page/AttendedEventsPage";
// components
import MainLayout from "./layouts/main-layout/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/schedule-event",
      element: (
        <MainLayout>
          <ScheduleEventPage />
        </MainLayout>
      ),
    },
    {
      path: "/my-events",
      element: (
        <MainLayout>
          <MyEventsPage />
        </MainLayout>
      ),
    },
    {
      path: "/public-events",
      element: (
        <MainLayout>
          <PublicEventsPage />
        </MainLayout>
      ),
    },
    {
      path: "/near-events",
      element: (
        <MainLayout hasPadding={false}>
          <NearEventsPage />
        </MainLayout>
      ),
    },
    {
      path: "/attended-events",
      element: (
        <MainLayout>
          <AttendedEventsPage />
        </MainLayout>
      ),
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
