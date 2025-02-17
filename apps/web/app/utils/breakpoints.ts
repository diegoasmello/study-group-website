export function getBreakpoint(breakpoint: "sm" | "md" | "lg" | "xl" | "2xl") {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--breakpoint-${breakpoint}`)
    .trim();
}
