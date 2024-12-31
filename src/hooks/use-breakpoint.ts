"use client";

import { useState, useEffect } from "react";

export const useBreakpoint = (breakpoint: number) => {
  const [matches, setMatches] = useState(false);
  const query = `(min-width: ${breakpoint}px)`;

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    mediaQueryList.addEventListener("change", updateMatches);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};
