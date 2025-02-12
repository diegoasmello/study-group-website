import { SVGProps } from "react";
import { FormControl, FormControlProps } from "./FormControl";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

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
              `h-[2.75rem] border rounded-xl px-4
              border-gray-300 text-gray-950
              hover:border-gray-400
              active:border-primary
              focus:outline-none focus:shadow-focus
              disabled:border-gray-200 disabled:bg-gray-100
              placeholder:text-gray-400 placeholder:italic
              transition`,
              Icon && "pl-[2.75rem]",
              className,
            ),
          )}
          required={required}
          {...rest}
        />
      </div>
    </FormControl>
  );
}

// interface InputWrapperProps {}

// function InputWrapper({}: InputWrapperProps) {
//     return ()
// }
