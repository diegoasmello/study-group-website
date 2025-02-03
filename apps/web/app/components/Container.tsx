import { twMerge } from "tailwind-merge";

export function Container({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div className={twMerge("container mx-auto px-4", className)}>
      {children}
    </div>
  );
}
