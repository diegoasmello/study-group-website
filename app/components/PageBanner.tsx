interface PageBannerProps {
  title: string;
  text: string;
}

export function PageBanner(props: PageBannerProps) {
  const { title, text } = props;

  return (
    <div className="bg-primary-lighter pt-14 pb-16">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-primary">{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
