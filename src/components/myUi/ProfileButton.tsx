"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

//import Icons
//shadcn  components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";

// context

const ProfileButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className={cn(className)}>
        <Avatar >
          <AvatarFallback>A</AvatarFallback>
          <AvatarImage src={"/profile.jpg"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 ">
        <DropdownMenuItem className="gap-4 p-2  cursor-pointer flex items-center " onClick={() => router.push("/site/profile")}        >
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
            <AvatarImage src={"/profile.jpg"}
            />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg">Azhar Lone</h1>
            <h2 className="text-foreground/60">Admin</h2>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Settings /> Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
