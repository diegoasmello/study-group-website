import { Checkbox } from "@headlessui/react";
import { IconCheck } from "../icons";
import { FormControlProps } from "./FormControl";
import { useRef, useState } from "react";

interface CheckboxInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "className" | "ref">,
    Omit<FormControlProps, "children" | "htmlFor"> {}

export function CheckboxInput(props: CheckboxInputProps) {
  const { label, ...rest } = props;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox
        checked={isChecked}
        onChange={setIsChecked}
        className="h-[24px] w-[24px] group flex items-center justify-center rounded-md border border-gray-200 bg-white cursor-pointer transition hover:border-primary focus:shadow-focus data-[checked]:bg-primary data-[checked]:text-white data-[checked]:hover:bg-primary-darker"
      >
        <IconCheck className="hidden size-6 fill-black group-data-[checked]:block" />
      </Checkbox>
      {label && <span className="text-gray-950 font-medium">{label}</span>}
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.currentTarget.checked)}
        {...rest}
      />
    </label>
  );
}
