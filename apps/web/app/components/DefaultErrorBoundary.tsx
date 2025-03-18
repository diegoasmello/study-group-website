import { Container } from "./Container";

export function DefaultErrorBoundary() {
  const message = "Page not found...";

  return (
    <Container className="pt-16 pb-20 grid justify-center gap-14">
      <h1 className="text-h2 text-gray-700">{message}</h1>
      <img src="/assets/illustrations/no-results.svg" alt={message} />
    </Container>
  );
}
