import { format } from "date-fns";
import { FormControl, FormControlProps } from "./FormControl";
import { TextInput } from "./TextInput";

interface DateRangeInputProps
  extends Omit<FormControlProps, "children">,
    Omit<React.ComponentProps<"input">, "type" | "defaultValue"> {
  defaultValue?: DateRange;
}

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export function DateRangeInput(props: DateRangeInputProps) {
  const { label, defaultValue } = props;

  return (
    <FormControl label={label}>
      <div className="flex items-center gap-8">
        <TextInput
          name="startDate"
          type="date"
          defaultValue={
            defaultValue?.startDate
              ? format(defaultValue?.startDate, "yyyy-MM-dd")
              : undefined
          }
        />
        <span className="text-gray-950 font-medium">até</span>
        <TextInput
          name="endDate"
          type="date"
          defaultValue={
            defaultValue?.endDate
              ? format(defaultValue?.endDate, "yyyy-MM-dd")
              : undefined
          }
        />
      </div>
    </FormControl>
  );
}
