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
import { DropdownProvider } from "./context/DropdownContext";
import AccountSettingsPage from "./pages/account-settings-page/AccountSettingsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ModalProvider>
          <WelcomePage />

          <FarketmezModal />
        </ModalProvider>
      ),
    },
    {
      path: "/schedule-event",
      element: (
        <ModalProvider>
          <MainLayout>
            <ScheduleEventPage />

            <FarketmezModal />
          </MainLayout>
        </ModalProvider>
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
        <MainLayout shouldShowSwitcher={false}>
          <AttendedEventsPage />
        </MainLayout>
      ),
    },
    {
      path: "/account-settings",
      element: (
        <MainLayout shouldShowSwitcher={false}>
          <AccountSettingsPage />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div className="App">
      <AppProvider>
        <DropdownProvider>
          <RouterProvider router={router} />
        </DropdownProvider>
      </AppProvider>
    </div>
  );
}

export default App;
