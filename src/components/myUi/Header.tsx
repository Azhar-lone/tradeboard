"use client";

// import { usePathname } from "next/navigation";
import ProfileButton from "./ProfileButton";
import { ModeToggle } from "./mode-toggle";
import Hint from "./Hint";
import {
  SidebarOpenIcon,
  SidebarCloseIcon,
  ServerIcon
} from "lucide-react"
import Link from "next/link";
import useSidebar from "@/hooks/use-sidebar";
import Notifications from "./Notifications";
import { buttonVariants } from "../ui/button";

const Header = () => {
  // const path = usePathname();
  const { isOpen, setIsOpen } = useSidebar()
  return (
    <nav className="flex items-center justify-between border-b-2 px-6 py-2 w-[100%] sticky  backdrop-blur z-50 top-0 gap-5  ">
      <div className="flex gap-3 items-center">


        <Hint label={isOpen ? "close" : "open"}>
          {isOpen ?
            <SidebarCloseIcon onClick={() => setIsOpen((prev) => !prev)} /> : <SidebarOpenIcon onClick={() => setIsOpen((prev) => !prev)} />}
        </Hint>
        <Link className={buttonVariants({
          variant: "outline"
        })} href={"/site"}>
          <ServerIcon />
          TradeBoard
        </Link>

      </div>
      <ul className="flex gap-3 items-center">
        <Notifications />
        <ModeToggle />
        <ProfileButton />
      </ul>
    </nav>
  );
};

export default Header;


