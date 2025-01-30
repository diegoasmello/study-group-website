import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuItemsProps,
} from "@headlessui/react";
import { LinkProps, NavLink } from "@remix-run/react";

interface DropdownMenuProps extends Pick<MenuItemsProps, "children"> {
  anchorGap?: number;
}

interface DropdownItemLinkProps extends Pick<LinkProps, "to" | "children"> {}

interface DropdownItemButtonProps
  extends Pick<React.ComponentProps<"button">, "onClick" | "children"> {}

export const Dropdown = Menu;

export const DropdownButton = MenuButton;

export function DropdownMenu({ children, anchorGap = 8 }: DropdownMenuProps) {
  return (
    <MenuItems
      modal={false}
      transition
      anchor="bottom start"
      style={{ "--custom-anchor-gap": anchorGap + "px" } as React.CSSProperties}
      className={`z-20 w-[136px] origin-top-right rounded-xl p-2 bg-white shadow-custom-2 flex flex-col gap-1 transition duration-100 ease-out [--anchor-gap:var(--custom-anchor-gap)]`}
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
