"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { meetingSchema } from "@/validation";
import CalendarInput from "./inputs/CalendarInput";
import { useAppointments } from "@/context/AppointmentProvider";
import { Doctor } from "@/types";
import { toast } from "react-toastify";
import { AppointmentsList } from "./AppointmentList";

type FormData = z.infer<typeof meetingSchema>;

const MeetingForm = ({ doctor }: { doctor: Doctor }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      dateOption: "preset",
    },
  });
  const { addAppointment, appointments } = useAppointments();

  const { handleSubmit, watch } = methods;
  const dateOption = watch("dateOption");

  const onSubmit = (data: FormData) => {
    const selectedDate = data.dateOption === "preset" ? data.presetDate : data.customDate;

    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate as string,
      specialty: doctor.specialty,
    });

    methods.reset();
    toast(`Appointment booked with ${doctor.name} on ${selectedDate}`);
  };
  return (
    <div className=" px-8 py-4">
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Date Option */}
            <FormField
              control={methods.control}
              name="dateOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Choose Date</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="preset" />
                        </FormControl>
                        <FormLabel className="font-normal text-base">From Available Dates</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="custom" />
                        </FormControl>
                        <FormLabel className="font-normal text-base">Pick Custom Date</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Preset Dates */}
            {dateOption === "preset" && (
              <FormField
                control={methods.control}
                name="presetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select an Available Date</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        {doctor.availability.map((date) => (
                          <FormItem key={date} className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value={date} />
                            </FormControl>
                            <FormLabel className="font-normal text-base">{date}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Custom Date */}
            {dateOption === "custom" && <CalendarInput name="customDate" label="Custom Date" disableOldDates />}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </FormProvider>
      {appointments.length > 0 && (
        <div className="space-y-4 flex flex-col gap-1 my-5">
          <h2 className=" text-2xl font-semibold">My Appointments</h2>
          <AppointmentsList />
        </div>
      )}
    </div>
  );
};

export default MeetingForm;
