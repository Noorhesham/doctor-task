import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string;

  type?: string;

  className?: string;
  description?: string;

  desc?: string;

  placeholder?: string;
  label2?: string;
  optional?: boolean;
  returnFullPhone?: boolean;

  disabled?: boolean;
}

export interface CalendarProps {
  name: string;
  label?: string;
}
const FormInput = ({
  name,
  label,
  type = "text",
  className,
  desc,
  disabled,
  placeholder,
  optional = false,
}: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col gap-3 my-2 !space-y-0  relative`}>
          {label !== "" && (
            <FormLabel className={`uppercase relative w-fit `}>
              {!optional && label && <span className={`absolute -right-3 top-0   font-normal text-red-600`}>*</span>}
              {label}
            </FormLabel>
          )}
          <div className={`relative  w-full inline-flex items-center justify-center ${className}`}>
            <FormControl className={`   `}>
              {
                <div className=" flex flex-col gap-2 w-full items-start">
                  <Input
                    disabled={disabled}
                    type={type}
                    accept={type === "file" ? "image/*, application/pdf" : undefined}
                    className={` mt-auto shadow-sm w-full `}
                    placeholder={placeholder}
                    {...field}
                  />
                </div>
              }
            </FormControl>
          </div>
          {desc && <FormDescription className=" text-sm text-muted-foreground">{desc}</FormDescription>}
          <FormMessage className=" text-sm dark:text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
