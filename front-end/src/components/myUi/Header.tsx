"use client";

import ProfileButton from "./ProfileButton";
import { ModeToggle } from "./mode-toggle";
import Hint from "./Hint";
import { SidebarOpenIcon, SidebarCloseIcon, ServerIcon } from "lucide-react";
import Link from "next/link";
import useSidebar from "@/hooks/use-sidebar";
import Notifications from "./Notifications";
import { buttonVariants } from "../ui/button";
import { useDevice } from "@/hooks/use-device";
import { ScrollArea } from "@radix-ui/react-scroll-area"; // Make sure to import ScrollAreaRoot if needed
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "./Slider";
import { categorizedLinks, secondlinks } from "./sidebar/sidebar-data";

const Header = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const device = useDevice();
  const path = usePathname();
  const btnvariant = [
    "default",
    "ghost",
    "destructive",
    "secondary",
    "outline",
  ] as const;
  type Variant = (typeof btnvariant)[number];
  const [logoVariant, setLogoVariant] = useState<Variant>("default");

  useEffect(() => {
    if (device == "tablet") {
      setIsOpen(true);
    }
  }, [device, setIsOpen]);

  useEffect(() => {
    let index = 1;

    setInterval(() => {
      setLogoVariant(btnvariant[index]);
      if (index < btnvariant.length - 1) index++;
      else index = 0;
    }, 3000);
  }, [btnvariant]);

  return (
    <nav className="flex items-center justify-between border-b-2 px-6 py-2 w-[100%] sticky backdrop-blur z-50 top-0 gap-5">
      <div className="flex gap-3 items-center justify-between flex-row-reverse md:flex-row lg:w-fit w-full">
        <Hint label={isOpen ? "close" : "open"}>
          {isOpen ? (
            <SidebarCloseIcon
              onClick={() => setIsOpen((prev) => !prev)}
              className="hidden md:block"
            />
          ) : (
            <SidebarOpenIcon
              onClick={() => setIsOpen((prev) => !prev)}
              className="hidden md:block"
            />
          )}
        </Hint>
        <Link
          className={buttonVariants({ variant: logoVariant })}
          href={"/dashboard"}
        >
          <ServerIcon />
          TradeBoard
        </Link>
      </div>
      <ul className=" gap-3 items-center  flex ">
        <div className="md:flex hidden ">
          <ModeToggle />
        </div>
        <Notifications />

        <ProfileButton />
      </ul>

      <Slider side="right">
        <div
          onDoubleClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden mt-2"
        >
          <ScrollArea className="h-[90vh] w-full overflow-auto">
            {" "}
            {/* Added fixed height */}
            <div className="pr-4">
              {" "}
              {/* Add some padding to prevent content from touching scrollbar */}
              {categorizedLinks.map((items, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center gap-3 w-full mx-auto"
                >
                  {items.category && (
                    <h1 className="text-md font-bold p-2">{items.category}</h1>
                  )}
                  {items.links.map(({ Icon, href, text }, index) => (
                    <Link
                      href={href}
                      key={index}
                      className={`flex gap-2 p-2 ${
                        path === href && "ml-1 border-l-4 p-1 border-primary"
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
            </div>
            <div className="border-t-2 pr-4">
              {" "}
              {/* Added padding here too */}
              {secondlinks.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className={`flex gap-2 p-2 ${
                    path === link.href && "ml-1 text-primary p-1 border-primary"
                  }`}
                >
                  <Hint label={link.text}>
                    <link.Icon />
                  </Hint>
                  <h3>{link.text}</h3>
                </Link>
              ))}
            </div>
            <ModeToggle className="w-fit" />
          </ScrollArea>
        </div>
      </Slider>
    </nav>
  );
};

export default Header;
