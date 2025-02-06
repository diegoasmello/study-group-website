import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  ComboboxInput as HUIComboboxInput,
} from "@headlessui/react";
import { useState } from "react";
import { FormControl, FormControlProps } from "./FormControl";
import { IconChevronDown } from "../icons";

type ComboboxItem = { label: string; value: string };

interface ComboboxInputProps<T>
  extends Omit<FormControlProps, "children" | "htmlFor"> {
  name: string;
  items: ComboboxItem[];
  immediate?: boolean;
  defaultValue?: T;
}

export function ComboboxInput<T>(props: ComboboxInputProps<T>) {
  const { items, name, label, required, immediate, defaultValue } = props;

  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  const displayValue = (selectedValue: string) =>
    filteredItems.find((item) => item.value === selectedValue)?.label ?? "";

  // const computedDefaultValue = filteredItems.find((item) => item.value === defaultValue)

  return (
    <FormControl label={label} htmlFor={name} required={required}>
      <Combobox<ComboboxItem["value"]>
        name={name}
        immediate={immediate}
        defaultValue={filteredItems[0].value}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          <HUIComboboxInput
            displayValue={displayValue as any}
            // defaultValue={defaultValue}
            onChange={(event) => setQuery(event.target.value)}
            className="
            w-full h-[2.75rem] border rounded-xl px-4 pr-10
            border-gray-300 text-gray-950
            hover:border-gray-400
            active:border-primary
            focus:outline-none focus:shadow-focus
            disabled:border-gray-200 disabled:bg-gray-100
            placeholder:text-gray-400 placeholder:italic
            transition"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 text-gray-400 data-[hover]:text-primary">
            <IconChevronDown className="size-6" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className="w-[calc(var(--input-width)+8px)] p-4 mt-2 bg-white shadow-custom-2 rounded-xl empty:invisible flex flex-col gap-2 z-30"
          anchor="bottom"
          transition
          modal={false}
        >
          {filteredItems.map((item) => (
            <ComboboxOption
              key={item.value}
              value={item.value}
              className="h-[2.75rem] min-h-[2.75rem] flex items-center px-4 bg-white rounded-lg transition data-[focus]:bg-primary-lighter cursor-pointer "
            >
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </FormControl>
  );
}
