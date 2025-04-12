"use client";

// import { usePathname } from "next/navigation";
import ProfileButton from "./ProfileButton";
import { ModeToggle } from "./mode-toggle";
import Hint from "./Hint";
import { SidebarOpenIcon, SidebarCloseIcon, ServerIcon } from "lucide-react";
import Link from "next/link";
import useSidebar from "@/hooks/use-sidebar";
import Notifications from "./Notifications";
import { buttonVariants } from "../ui/button";
import { useDevice } from "@/hooks/use-device";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Slider from "./Slider";
import { categorizedLinks, secondlinks } from "./sidebar/sidebar-data";

const Header = () => {
  // const path = usePathname();
  const { isOpen, setIsOpen } = useSidebar();
  const device = useDevice();
  const path = usePathname();
  useEffect(() => {
    if (device == "tablet") {
      setIsOpen(true);
    }
  }, [device]);
  return (
    <nav className="flex items-center justify-between border-b-2 px-6 py-2 w-[100%] sticky  backdrop-blur z-50 top-0 gap-5  ">
      <div className="flex gap-3 items-center justify-between flex-row-reverse lg:flex-row lg:w-fit w-full">

        {/* on small screen show this slider */}
        <Slider side="right">
          <div
            onDoubleClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden"
          >
            <ScrollArea className="overflow-y-auto w-full  ">
              {categorizedLinks.map((items, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center gap-3 w-full mx-auto "
                >
                  {items.category && (
                    <h1 className="text-md font-bold p-2 ">{items.category}</h1>
                  )}
                  {items.links.map(({ Icon, href, text }, index) => (
                    <Link
                      href={href}
                      key={index}
                      className={`flex gap-2 p-2 ${
                        path === href && "ml-1 border-l-4  p-1 border-primary"
                      }`}
                    >
                      <Hint label={text}>
                        <Icon />
                      </Hint>
                    <h3>{text}</h3>
                    </Link>
                  ))}
                </div>
              ))}
            </ScrollArea>

            <div className="border-t-2">
              {secondlinks.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className={`flex gap-2 p-2 ${
                    path === link.href &&
                    "ml-1 text-primary  p-1 border-primary"
                  }`}
                >
                  <Hint label={link.text}>
                    <link.Icon />
                  </Hint>
                  {isOpen && <h3>{link.text}</h3>}
                </Link>
              ))}
            </div>
          </div>
        </Slider>

        <Hint label={isOpen ? "close" : "open"}>
          {isOpen ? (
            <SidebarCloseIcon
              onClick={() => setIsOpen((prev) => !prev)}
              className="hidden lg:block"
            />
          ) : (
            <SidebarOpenIcon
              onClick={() => setIsOpen((prev) => !prev)}
              className="hidden lg:block"
            />
          )}
        </Hint>
        <Link
          className={buttonVariants({
            variant: "outline",
          })}
          href={"/site"}
        >
          <ServerIcon />
          TradeBoard
        </Link>
      </div>
      <ul className="lg:flex gap-3 items-center hidden ">
        <Notifications />
        <ModeToggle />
        <ProfileButton />
      </ul>

    </nav>
  );
};

export default Header;
