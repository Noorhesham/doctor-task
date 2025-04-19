import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";

const CalendarInput = ({
  name,
  label,
  disabled,
  optional,
  monthOnly = false,
  disableOldDates = false,
}: {
  name: string;
  label?: string;
  disabled?: boolean;
  optional?: boolean;
  monthOnly?: boolean;
  disableOldDates?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem className={`relative w-full`}>
            <FormLabel className="duration-200 relative uppercase">
              {!optional && <span className="absolute -right-3 top-0 font-normal text-red-600">*</span>}
              {label || "Date"}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 flex justify-between text-left rounded-lg font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      monthOnly ? (
                        format(new Date(field.value), "MMMM yyyy") // Format to month/year
                      ) : (
                        format(new Date(field.value), "yyyy-MM-dd")
                      ) // Full date
                    ) : (
                      <span>SELECT</span>
                    )}
                    <CalendarIcon className="ml-auto mr-2 h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent sideOffset={-40} className="w-full z-[51] relative p-0" align="end">
                <Calendar
                  className="relative w-full"
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1990}
                  toYear={new Date().getFullYear() + 50} // Allow 50 years in the future
                  selected={field.value}
                  onSelect={(date) => {
                    if (!date) return;
                    const formattedDate = format(date, "yyyy-MM-dd");
                    field.onChange(formattedDate);
                    setOpen(false);
                  }}
                  disabled={
                    (date) => disableOldDates && isBefore(date, new Date()) // Disable dates before today
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
};

export default CalendarInput;
