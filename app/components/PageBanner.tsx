import { Container } from "./Container";

interface PageBannerProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  title: string;
  text: string;
}

export function PageBanner(props: PageBannerProps) {
  const { title, text, className, ...rest } = props;

  return (
    <div className={`bg-primary-lighter pt-14 pb-16 ${className}`} {...rest}>
      <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2 col-span-3">
          <h1 className="text-h1 text-primary text-nowrap">{title}</h1>
          <p className="text-lead-1 text-gray-900">{text}</p>
        </div>
      </Container>
    </div>
  );
}
