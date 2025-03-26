export function getBreakpoint(breakpoint: "sm" | "md" | "lg" | "xl" | "2xl") {
  if (typeof document !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--breakpoint-${breakpoint}`)
      .trim();
  }
}
