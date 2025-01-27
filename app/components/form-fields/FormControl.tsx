export interface FormControlProps {
  children: JSX.Element;
  htmlFor?: string;
  label?: string;
  required?: boolean;
  error?: JSX.Element;
}

export function FormControl(props: FormControlProps) {
  const { htmlFor, label, children, required, error } = props;

  return (
    <div className="flex flex-col gap-2 items-start">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-h5 text-primary uppercase font-medium"
        >
          {label}
          {required && <span>*</span>}
        </label>
      )}
      {children}
      {error && <div>{error}</div>}
    </div>
  );
}
