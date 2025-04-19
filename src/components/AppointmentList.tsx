"use client";

import { Button } from "@/components/ui/button";
import { useAppointments } from "@/context/AppointmentProvider";

export const AppointmentsList = () => {
  const { appointments, removeAppointment } = useAppointments();

  return (
    <div className="">
      {appointments.length === 0 ? (
        <p className="text-muted-foreground">No appointments booked yet</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-start">
              <div>
                <h3 className="font-medium">{appt.doctorName}</h3>
                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Date:</span> {appt.date}
                </p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeAppointment(index)}>
                Cancel
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
