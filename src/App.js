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
import AccountDropdown from "./components/header/components/account-dropdown/AccountDropdown";

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
        <DropdownProvider>
          <ModalProvider>
            <MainLayout>
              <ScheduleEventPage />

              <FarketmezModal />

              <AccountDropdown />
            </MainLayout>
          </ModalProvider>
        </DropdownProvider>
      ),
    },
    {
      path: "/my-events",
      element: (
        <DropdownProvider>
          <ModalProvider>
            <MainLayout>
              <MyEventsPage />

              <AccountDropdown />

              <FarketmezModal />
            </MainLayout>
          </ModalProvider>
        </DropdownProvider>
      ),
    },
    {
      path: "/public-events",
      element: (
        <DropdownProvider>
          <MainLayout>
            <PublicEventsPage />

            <AccountDropdown />
          </MainLayout>
        </DropdownProvider>
      ),
    },
    {
      path: "/near-events",
      element: (
        <DropdownProvider>
          <MainLayout hasPadding={false}>
            <NearEventsPage />

            <AccountDropdown />
          </MainLayout>
        </DropdownProvider>
      ),
    },
    {
      path: "/attended-events",
      element: (
        <DropdownProvider>
          <MainLayout shouldShowSwitcher={false}>
            <AttendedEventsPage />

            <AccountDropdown />
          </MainLayout>
        </DropdownProvider>
      ),
    },
    {
      path: "/account-settings",
      element: (
        <DropdownProvider>
          <MainLayout shouldShowSwitcher={false}>
            <AccountSettingsPage />

            <AccountDropdown />
          </MainLayout>
        </DropdownProvider>
      ),
    },
  ]);

  return (
    <div className="App">
      <AppProvider>
        <RouterProvider basename="/" router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
