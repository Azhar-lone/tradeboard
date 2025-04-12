"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Components
// Hooks
import useSidebar from "@/hooks/use-sidebar";
// custom
import Hint from "../Hint";
import { categorizedLinks, secondlinks } from "./sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useDevice } from "@/hooks/use-device";
const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const path = usePathname();
  const device = useDevice();

  useEffect(() => {
    if (device == "laptop") {
      setIsOpen(false);
    }
  }, [device, setIsOpen]);
  return (
    <div
      className={` flex-col justify-between z-50 bg-background hidden md:flex ${
        isOpen ? "w-48" : "w-12"
      } fixed top-14 left-0 gap-1   h-[85vh]   py-3 border-r-2`}
      onDoubleClick={() => setIsOpen((prev) => !prev)}
    >
      <ScrollArea className="overflow-y-auto w-full  ">
        {categorizedLinks.map((items, index) => (
          <div
            key={index}
            className="flex flex-col justify-center gap-3 w-full mx-auto "
          >
            {items.category && isOpen && (
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
                {isOpen && <h3>{text}</h3>}
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
              path === link.href && "ml-1 text-primary  p-1 border-primary"
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
  );
};

export default Sidebar;
