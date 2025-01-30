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

interface ComboboxInputProps
  extends Omit<FormControlProps, "children" | "htmlFor"> {
  name: string;
  items: ComboboxItem[];
}

export function ComboboxInput(props: ComboboxInputProps) {
  const { items, name, label, required } = props;

  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <FormControl label={label} htmlFor={name} required={required}>
      <Combobox
        //   value={selectedPerson}
        //   onChange={setSelectedPerson}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          <HUIComboboxInput
            //   displayValue={(item: ComboboxItem) => item.label}
            onChange={(event) => setQuery(event.target.value)}
            className="
            w-full h-[44px] border rounded-xl px-4 pr-10
            border-gray-300 text-gray-950
            hover:border-gray-400
            active:border-primary
            focus:outline-none focus:shadow-focus
            disabled:border-gray-200 disabled:bg-gray-100
            placeholder:text-gray-400 placeholder:italic
            transition"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 text-gray-400 data-[hover]:text-primary">
            <IconChevronDown width={24} height={24} />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className="w-[calc(var(--input-width)+8px)] p-4 mt-2 bg-white shadow-custom-2 rounded-xl empty:invisible flex flex-col gap-2"
          anchor="bottom"
          transition
          modal={false}
        >
          {filteredItems.map((item) => (
            <ComboboxOption
              key={item.value}
              value={item.value}
              className="h-[44px] min-h-[44px] flex items-center px-4 bg-white rounded-lg transition data-[focus]:bg-primary-lighter cursor-pointer "
            >
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </FormControl>
  );
}
