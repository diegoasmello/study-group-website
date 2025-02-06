import { Checkbox } from "@headlessui/react";
import { IconCheck } from "../icons";
import { FormControlProps } from "./FormControl";

interface CheckboxInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "className" | "ref">,
    Omit<FormControlProps, "children" | "htmlFor"> {}

export function CheckboxInput(props: CheckboxInputProps) {
  const { name, label, value, defaultChecked } = props;

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="size-[1.5rem] group flex items-center justify-center rounded-md border border-gray-200 bg-white cursor-pointer transition hover:border-primary focus:shadow-focus data-[checked]:bg-primary data-[checked]:text-white data-[checked]:hover:bg-primary-darker"
      >
        <IconCheck className="hidden size-6 fill-black group-data-[checked]:block" />
      </Checkbox>
      {label && <span className="text-gray-950 font-medium">{label}</span>}
    </label>
  );
}
