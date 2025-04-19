import { Appointment, AppointmentsContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AppointmentsContext = createContext<AppointmentsContextType>({
  appointments: [],
  addAppointment: () => {},
  removeAppointment: () => {},
});

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("doctorAppointments");
    if (stored) {
      try {
        setAppointments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse appointments", e);
      }
    }
  }, []);

  // Save to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem("doctorAppointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const removeAppointment = (index: number) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
