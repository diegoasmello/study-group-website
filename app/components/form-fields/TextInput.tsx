import { SVGProps } from "react";
import { FormControl, FormControlProps } from "./FormControl";

interface TextInputProps
  extends React.ComponentProps<"input">,
    Omit<FormControlProps, "children" | "htmlFor"> {
  name: string;
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export function TextInput(props: TextInputProps) {
  const { name, Icon, label, className, required, ...rest } = props;

  return (
    <FormControl label={label} htmlFor={name} required={required}>
      <div className="relative">
        {Icon && (
          <div className="absolute h-[44px] w-[44px] flex items-center justify-center text-gray-400">
            <Icon width={24} height={24} />
          </div>
        )}
        <input
          name={name}
          className={`${className} h-[44px] border rounded-xl px-4
            border-gray-300 text-gray-950
            hover:border-gray-400
            active:border-primary
            focus:outline-none focus:shadow-focus
            disabled:border-gray-200 disabled:bg-gray-100
            placeholder:text-gray-400 placeholder:italic
            transition
            ${Icon ? "pl-[44px]" : ""}`}
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
