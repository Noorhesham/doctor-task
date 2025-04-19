import { LOCATIONS, SPECIALTIES } from "@/constants";

// Type definitions
export type Specialty = (typeof SPECIALTIES)[number];
export type Location = (typeof LOCATIONS)[number];

export interface Doctor {
  id: number;
  name: string;
  photo: string;
  specialty: Specialty;
  availability: string[];
  location: Location;
  rating: number;
  experience: number;
}
export type FilterState = {
  specialties: string[];
  locations: string[];
  searchQuery: string;
};
export type Appointment = {
  doctorId: number;
  doctorName: string;
  date: string;
  specialty: string;
};

export type AppointmentsContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (index: number) => void;
};
