import { FormControl, FormControlProps } from "./FormControl";

interface TextInputProps
  extends React.ComponentProps<"input">,
    Omit<FormControlProps, "children" | "htmlFor"> {
  name: string;
}

export function TextInput(props: TextInputProps) {
  const { name, label, className, ...rest } = props;

  return (
    <FormControl label={label} htmlFor={name}>
      <input
        name={name}
        className={`${className} h-[44px] border rounded-xl px-4
        border-gray-200 text-gray-950
        hover:border-gray-300
        active:border-primary
        focus:outline-none focus:shadow-focus
        disabled:border-gray-200 disabled:bg-gray-100
        placeholder:text-gray-300 placeholder:italic`}
        {...rest}
      />
    </FormControl>
  );
}

// interface InputWrapperProps {}

// function InputWrapper({}: InputWrapperProps) {
//     return ()
// }
