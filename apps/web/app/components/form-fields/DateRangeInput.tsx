import { FormControl, FormControlProps } from "./FormControl";
import { TextInput } from "./TextInput";

interface DateRangeInputProps
  extends Omit<FormControlProps, "children">,
    Omit<React.ComponentProps<"input">, "type"> {}

// type DateRange = {
//   startDate: Date;
//   endDate: Date;
// };

export function DateRangeInput(props: DateRangeInputProps) {
  const { label } = props;

  return (
    <FormControl label={label}>
      <div className="flex items-center gap-8">
        <TextInput name={"a"} type="date" />
        <span className="text-gray-950 font-medium">até</span>
        <TextInput name={"a"} type="date" />
      </div>
    </FormControl>
  );
}
