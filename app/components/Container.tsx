export function Container({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>{children}</div>
  );
}
