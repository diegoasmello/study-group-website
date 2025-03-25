import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Container } from "./Container";

import { useTranslation } from "react-i18next";

export function DefaultErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation();

  let message: string;
  if (isRouteErrorResponse(error)) {
    message = t(`Errors.${error.status}`);
  } else {
    message = t("Errors.default");
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
