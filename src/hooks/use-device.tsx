import * as React from "react";

const TABLET_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 425;
const LAPTOP_BREAKPOINT = 1024;
const LARGE_BREAKPOINT = 1440;

export function useDevice() {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [device, setDevice] = React.useState<
    "mobile" | "tablet" | "laptop" | "large"
  >("laptop");

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Set initial device
    if (width < MOBILE_BREAKPOINT) {
      setDevice("mobile");
    } else if (width < TABLET_BREAKPOINT) {
      setDevice("tablet");
    } else if (width < LAPTOP_BREAKPOINT) {
      setDevice("laptop");
    } else if (width < LARGE_BREAKPOINT) {
      setDevice("large");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return device;
}
