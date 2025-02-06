import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { IconChevronRight, IconChevronLeft } from "./icons";

// export type PaginateData = {

// }

interface PaginatorProps {
  pageSize: number;
  total: number;
}

export function Paginator(props: PaginatorProps) {
  const { pageSize, total } = props;

  const numberOfPages = total / pageSize;

  return (
    <nav className="flex gap-4">
      <Button skin="outline" size="md" className="w-[2.75rem] px-0">
        <IconChevronLeft className="size-6" />
      </Button>
      <nav className="flex gap-2">
        {Array.from({ length: numberOfPages }).map((_, index) => (
          <ButtonLink
            key={index}
            skin="ghost"
            size="md"
            className="w-[2.75rem] px-0"
            to={`page/${index + 1}`}
          >
            {index + 1}
          </ButtonLink>
        ))}
      </nav>
      <Button skin="outline" size="md" className="w-[2.75rem] px-0">
        <IconChevronRight className="size-6" />
      </Button>
    </nav>
  );
}
