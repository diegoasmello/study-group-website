import { Button } from "./Button";
import { IconChevronRight, IconChevronLeft } from "./icons";

// interface PaginatorProps {}

export function Paginator(/*props: PaginatorProps*/) {
  return (
    <nav className="flex gap-4">
      <Button skin="outline" size="md" className="w-[44px] px-0">
        <IconChevronLeft className="size-6" />
      </Button>
      <nav className="flex gap-2">
        <Button skin="ghost" size="md" className="w-[44px] px-0">
          1
        </Button>
        <Button skin="ghost" size="md" className="w-[44px] px-0">
          2
        </Button>
        <Button skin="ghost" size="md" className="w-[44px] px-0">
          3
        </Button>
        <Button skin="ghost" size="md" className="w-[44px] px-0">
          4
        </Button>
      </nav>
      <Button skin="outline" size="md" className="w-[44px] px-0">
        <IconChevronRight className="size-6" />
      </Button>
    </nav>
  );
}
