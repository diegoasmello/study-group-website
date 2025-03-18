import { useLocation } from "@remix-run/react";
import { IconChevronRight, IconChevronLeft } from "./icons";
import { ButtonLink } from "./ButtonLink";
import { PageMeta } from "~/utils/paginator.server";

export function Paginator(props: PageMeta) {
  const { currentPage, prev, next, lastPage, total, perPage } = props;

  const location = useLocation();

  if (total <= perPage) return null;

  let route;
  const search = location.search;
  const pathname = location.pathname;
  const contains = pathname.includes("/page/");
  const splited = pathname.split("/page/");
  const page = splited[splited.length - 1];
  const pageIsNumber = !isNaN(Number(page));

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  if (contains && pageIsNumber) {
    route = splited[0];
  } else {
    route = pathname;
  }

  return (
    <nav className="flex gap-4">
      <ButtonLink
        to={`${route}/page/${prev}${search}`}
        skin="outline"
        size="md"
        className="w-[2.75rem] px-0"
        disabled={isFirstPage}
      >
        <IconChevronLeft className="size-6" />
      </ButtonLink>
      <nav className="flex gap-2">
        {Array.from({ length: lastPage }).map((_, index) => {
          const pageIndex = index + 1;
          const isCurrentPage = pageIndex === currentPage;
          return (
            <PageButton
              key={index}
              pageIndex={pageIndex}
              isCurrentPage={isCurrentPage}
              search={search}
              route={route}
            />
          );
        })}
      </nav>
      <ButtonLink
        to={`${route}/page/${next}${search}`}
        skin="outline"
        size="md"
        className="w-[2.75rem] px-0"
        disabled={isLastPage}
      >
        <IconChevronRight className="size-6" />
      </ButtonLink>
    </nav>
  );
}

const PageButton = ({
  pageIndex,
  isCurrentPage,
  search,
  route,
}: {
  pageIndex: number;
  isCurrentPage: boolean;
  search: string;
  route: string;
}) => {
  return (
    <ButtonLink
      to={isCurrentPage ? "#" : `${route}/page/${pageIndex}${search}`}
      skin={isCurrentPage ? "primary" : "ghost"}
      size="md"
      className="w-[2.75rem] px-0"
    >
      {pageIndex}
    </ButtonLink>
  );
};
