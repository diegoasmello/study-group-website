import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

interface TooptilProps {
  children: JSX.Element;
  text: string | undefined;
}

export function Tooltip(props: TooptilProps) {
  const { children, text } = props;

  return (
    <Popover>
      <PopoverButton as={Fragment}>{children}</PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="bg-gray-200/90 text-gray-950 px-4 py-3 rounded-xl text-sm/6 transition duration-200 ease-in-out [--anchor-gap:0.5rem] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {text}
      </PopoverPanel>
    </Popover>
  );
}
