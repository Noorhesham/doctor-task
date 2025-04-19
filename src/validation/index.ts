import { z } from "zod";
/**
 the goal of this validation is to make sure that the user has selected a date before submitting the form
 the date option is either preset or custom and nither of them are required unless the user has selected the option and option is defaulted to be preset
 */
export const meetingSchema = z
  .object({
    dateOption: z.enum(["preset", "custom"]),
    presetDate: z.string().optional(), // required only if dateOption is 'preset'
    customDate: z.string().optional(), // required only if dateOption is 'custom'
  })
  .refine(
    (data) => {
      if (data.dateOption === "preset") return !!data.presetDate;
      if (data.dateOption === "custom") return !!data.customDate;
      return false;
    },
    {
      message: "Please choose a date.",
      path: ["presetDate"], // just for ZodError display
    }
  );
