import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconChevronDown } from "./icons";
import { LinkProps, NavLink } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

interface DropdownItemLinkProps extends Pick<LinkProps, "to" | "children"> {}

interface DropdownItemButtonProps
  extends Pick<React.ComponentProps<"button">, "onClick" | "children"> {}

export function Dropdown({ label, children, className }: DropdownProps) {
  return (
    <Menu>
      <MenuButton
        className={twMerge(
          `inline-flex items-center gap-1 focus:outline-none data-[hover]:text-primary data-[open]:text-primary data-[focus]:outline-1 data-[focus]:outline-white`,
          className
        )}
      >
        {label}
        <IconChevronDown width={24} height={24} className="-mr-2" />
      </MenuButton>

      <MenuItems
        modal={false}
        transition
        anchor="bottom start"
        className="z-20 w-[136px] origin-top-right rounded-xl p-2 bg-white shadow-custom-2 flex flex-col gap-1 transition duration-100 ease-out [--anchor-gap:18px]"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export function DropdownItemLink({ to, children }: DropdownItemLinkProps) {
  return (
    <MenuItem>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `h-[40px] flex items-center px-4 rounded-lg font-medium transition ${
            isActive
              ? "bg-primary-light text-white data-[focus]:bg-primary-light"
              : "bg-white text-gray-950 data-[focus]:bg-primary-lighter"
          }`
        }
      >
        {children}
      </NavLink>
    </MenuItem>
  );
}

export function DropdownItemButton({
  onClick,
  children,
}: DropdownItemButtonProps) {
  return (
    <MenuItem>
      <button
        onClick={onClick}
        className="h-[40px] flex items-center px-4 rounded-lg data-[focus]:bg-primary-lighter transition"
      >
        {children}
      </button>
    </MenuItem>
  );
}
