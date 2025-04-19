import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSelect = ({
  name,
  label,
  placeholder,
  description,
  id,
  options,
  className,
  optional,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  id?: string;
  options?: {
    label: string;
    value: string;
  }[];
  className?: string;
  optional?: boolean;
}) => {
  const form = useFormContext();
  const selectedValue = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options?.find((p) => p.value === form.getValues(name)?.value || p.value === selectedValue);
        return (
          <FormItem className={`${className || ""} relative w-full `} id={id || ""}>
            <FormLabel className=" relative w-fit  capitalize">
              {" "}
              {!optional && <span className={`absolute -right-5 -top-[1px]  z-10   font-normal text-red-600`}>*</span>}
              {label}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className=" capitalize shadow-sm">
                  <SelectValue placeholder={placeholder || "SELECT"}>{selected?.label}</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options &&
                  options
                    .filter((option) => option !== form.getValues(name))
                    .map((option, i) => (
                      <SelectItem
                        className=" capitalize"
                        key={i + `${option.label} ${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSelect;
