import { Form } from "@remix-run/react";
import { Button } from "./Button";
import { IconChevronRight, IconChevronLeft } from "./icons";
import { PaginatedMeta } from "~/util/createPaginator";

export function Paginator(props: PaginatedMeta) {
  const { currentPage, prev, next, lastPage } = props;

  return (
    <nav className="flex gap-4">
      <Button skin="outline" size="md" className="w-[2.75rem] px-0">
        <IconChevronLeft className="size-6" />
      </Button>
      <nav className="flex gap-2">
        {Array.from({ length: lastPage }).map((_, index) => {
          const pageIndex = index + 1;
          const isCurrentPage = pageIndex === currentPage;
          return (
            <Page
              key={index}
              pageIndex={pageIndex}
              isCurrentPage={isCurrentPage}
            />
          );
        })}
      </nav>
      <Button skin="outline" size="md" className="w-[2.75rem] px-0">
        <IconChevronRight className="size-6" />
      </Button>
    </nav>
  );
}

const Page = ({
  pageIndex,
  isCurrentPage,
}: {
  pageIndex: number;
  isCurrentPage: boolean;
}) => {
  return (
    <Form>
      <input name="page" type="hidden" value={pageIndex} />
      <Button
        skin={isCurrentPage ? "primary" : "ghost"}
        size="md"
        className="w-[2.75rem] px-0"
      >
        {pageIndex}
      </Button>
    </Form>
  );
};
