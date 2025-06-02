import { SVGProps } from "react";
import { FormControl, FormControlProps } from "./FormControl";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { IconErrorCircle } from "./icons";

interface TextInputProps
  extends React.ComponentProps<"input">,
    Omit<FormControlProps, "children" | "htmlFor"> {
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export function TextInput(props: TextInputProps) {
  const { name, Icon, label, className, required, ...rest } = props;

  return (
    <FormControl label={label} htmlFor={name} required={required}>
      <div className="relative w-full">
        {Icon && (
          <div className="absolute size-[2.75rem] flex items-center justify-center text-gray-400">
            <Icon className="size-6" />
          </div>
        )}
        <input
          name={name}
          className={twMerge(
            clsx(
              `
              peer w-full h-[2.75rem] px-4
              text-gray-950
              border border-gray-300 rounded-xl
              hover:border-gray-400
              active:border-primary
              focus:outline-hidden focus:shadow-focus
              disabled:border-gray-200 disabled:bg-gray-100
              placeholder:text-gray-400 placeholder:italic
              focus:invalid:shadow-focus-danger
              required:focus:invalid:pr-[2.75rem]
              transition`,
              Icon && "pl-[2.75rem]",
              className,
            ),
          )}
          required={required}
          {...rest}
        />
        <div className="absolute top-0 right-0 text-danger size-[2.75rem] items-center justify-center hidden peer-invalid:peer-focus:flex">
          <IconErrorCircle className="size-6" />
        </div>
      </div>
    </FormControl>
  );
}
