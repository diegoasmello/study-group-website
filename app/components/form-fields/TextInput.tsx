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
        className={`${className} h-[44px] border rounded-2xl border-gray-200 text-gray-950 placeholder:text-gray-200`}
        {...rest}
      />
    </FormControl>
  );
}

// interface InputWrapperProps {}

// function InputWrapper({}: InputWrapperProps) {
//     return ()
// }
