"use client"
import * as React from "react";

const TABLET_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 425;
const LAPTOP_BREAKPOINT = 1024;
const LARGE_BREAKPOINT = 1440;

export function useDevice() {
  const [width, setWidth] = React.useState<number | null>(null); // Set initial state as null
  const [device, setDevice] = React.useState<"mobile" | "tablet" | "laptop" | "large">("laptop");

  React.useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      // Initial setup
      handleResize(); // Update on mount

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  React.useEffect(() => {
    if (width !== null) {
      if (width < MOBILE_BREAKPOINT) {
        setDevice("mobile");
      } else if (width < TABLET_BREAKPOINT) {
        setDevice("tablet");
      } else if (width < LAPTOP_BREAKPOINT) {
        setDevice("laptop");
      } else if (width < LARGE_BREAKPOINT) {
        setDevice("large");
      }
    }
  }, [width]);

  return device;
}
