import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuItemsProps,
} from "@headlessui/react";
import { LinkProps, NavLink } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import { twJoin, twMerge } from "tailwind-merge";

interface DropdownMenuProps
  extends Pick<MenuItemsProps, "children" | "anchor"> {
  anchorGap?: number;
  className?: string;
}

interface DropdownItemLinkProps extends Pick<LinkProps, "to" | "children"> {}

interface DropdownItemButtonProps
  extends Pick<React.ComponentProps<"button">, "onClick" | "children"> {}

export const Dropdown = Menu;

export const DropdownButton = MenuButton;

export function DropdownMenu({
  children,
  anchorGap = 8,
  className,
  anchor,
}: DropdownMenuProps) {
  return (
    <MenuItems
      modal={false}
      transition
      anchor={anchor ?? "bottom start"}
      style={{ "--custom-anchor-gap": anchorGap + "px" } as React.CSSProperties}
      className={twMerge(
        "z-20 w-[8.5rem] origin-top-right rounded-xl p-2 bg-white shadow-custom-2 flex flex-col gap-1 transition duration-100 ease-out [--anchor-gap:var(--custom-anchor-gap)]",
        className,
      )}
    >
      {children}
    </MenuItems>
  );
}

export function DropdownItemLink({ to, children }: DropdownItemLinkProps) {
  return (
    <MenuItem>
      <NavLink
        to={to}
        className={({ isActive }) =>
          twJoin(
            "h-[2.5rem] flex items-center px-4 rounded-lg font-medium transition",
            isActive
              ? "bg-primary-light text-white data-[focus]:bg-primary-light"
              : "bg-white text-gray-950 data-[focus]:bg-primary-lighter",
          )
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
    <MenuItem as={Fragment}>
      <button
        onClick={onClick}
        className="h-[2.5rem] flex items-center px-4 rounded-lg data-[focus]:bg-primary-lighter transition"
      >
        {children}
      </button>
    </MenuItem>
  );
}
