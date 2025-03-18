import { twMerge } from "tailwind-merge";
import { Container } from "./Container";

interface PageBannerProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  title: string;
  text: string;
  illustration?: JSX.Element;
}

export function PageBanner(props: PageBannerProps) {
  const { title, text, illustration, className, ...rest } = props;

  return (
    <div
      className={twMerge(
        "bg-primary-lighter pt-14 pb-16 relative overflow-hidden",
        className,
      )}
      {...rest}
    >
      <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2 col-span-10 lg:col-span-3">
          <h1 className="text-h1 text-primary text-nowrap">{title}</h1>
          <p className="text-lead-1 text-gray-900">{text}</p>
        </div>
        <div className="hidden lg:block select-none">{illustration}</div>
      </Container>
    </div>
  );
}
