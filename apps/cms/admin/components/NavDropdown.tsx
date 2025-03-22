/** @jsxRuntime classic */
/** @jsx jsx */
import { Stack, jsx, useTheme, Text } from "@keystone-ui/core";
import { useState } from "react";
import { ListNavItems } from "@keystone-6/core/admin-ui/components";
import { ListMeta } from "@keystone-6/core/types";
import { ChevronDownIcon } from "@keystone-ui/icons/icons/ChevronDownIcon";

type NavDropdownProps = {
  lists: ListMeta[];
  children: React.ReactNode;
};

export const NavDropdown = ({ lists, children }: NavDropdownProps) => {
  const isSelected = lists.some(
    (list) => location.pathname.split("/")[1] === `/${list.path}`.split("/")[1],
  );
  const [isOpen, setIsOpen] = useState(isSelected);

  const toggleOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <li css={{ marginBottom: "4px" }}>
      <button
        aria-current={isOpen ? "location" : false}
        css={{
          background: "transparent",
          borderBottomRightRadius: "4px", // radii.xsmall
          borderTopRightRadius: "4px", // radii.xsmall
          color: "#6b7280", // palette.neutral700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 500, // typography.fontWeight.medium,
          marginRight: "24px", //spacing.xlarge,
          padding: "8px 24px", //`${spacing.small}px ${spacing.xlarge}px`,
          paddingRight: "8px",
          position: "relative",
          textDecoration: "none",
          width: "calc(100% - 24px)",
          textAlign: "left",
          cursor: "pointer",
          ":hover": {
            background: "#eff6ff", // colors.backgroundHover
            color: "#2563eb", // colors.linkHoverColor
          },
          "&[aria-current=location]": {
            background: "#e5e8eb",
            color: "#000000",
          },
        }}
        onClick={toggleOpen}
      >
        {children}
        <ChevronDownIcon />
      </button>
      <ul
        style={{
          background: "#eff3f6",
          overflow: "hidden",
          padding: "0px",
          maxHeight: isOpen ? "380px" : "0px",
          marginRight: "24px",
          transition: "max-height 0.5s ease",
        }}
      >
        <ListNavItems lists={lists} />
      </ul>
    </li>
  );
};
