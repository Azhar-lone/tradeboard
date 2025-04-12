import * as React from "react"

const TABLET_BREAKPOINT = 768
const MOBILE_BREAKPOINT = 425
const LAPTOP_BREAKPOINT = 1024
const LARGE_BREAKPOINT = 1440





export function useDevice() {
    const [width, setWidth] = React.useState<number>(window.innerWidth)
    const [device, setDevice] = React.useState<"mobile" | "tablet" | "laptop" | "large">("laptop")
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
        if (width < MOBILE_BREAKPOINT) {
            setDevice("mobile")
            return device
        }
        else if (width < TABLET_BREAKPOINT) {
            setDevice("tablet")
            return device

        } else if (width < LAPTOP_BREAKPOINT) {
            setDevice("laptop")
            return device

        }
        else if (width < LARGE_BREAKPOINT) {
            setDevice("large")
            return device
        }

    }, [])

    return device

}
