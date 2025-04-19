import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppointmentsProvider } from "./context/AppointmentProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <the goal of this context is to manage the appointments the user chose from teh doctors rendered from the DoctorList component*/}
    <AppointmentsProvider>
      <App />
    </AppointmentsProvider>
  </StrictMode>
);
