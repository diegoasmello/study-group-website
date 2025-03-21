import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Container } from "./Container";

export function DefaultErrorBoundary() {
  let message: string;

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    message = messages[error.status] ?? error.statusText;
  } else {
    message = "Something went wrong...";
  }

  return (
    <Container className="pt-16 pb-20 grid justify-center gap-14">
      <h1 className="text-h3 text-gray-600 text-center">{message}</h1>
      <img
        className="-ml-4"
        src="/assets/illustrations/no-results.svg"
        alt={message}
      />
    </Container>
  );
}

const messages: Record<number, string> = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Page not found",
  405: "Method not allowed",
};
