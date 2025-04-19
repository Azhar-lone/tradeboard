"use client";
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
import { routes, backendRoutes } from "@/constants/routes";
import { toast } from "sonner";
// context
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/lib/store/features/user/userSlice";
import type { RootState, AppDispatch } from "@/lib/store/store";

const ProfileButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  React.useEffect(() => {
    if (user === null) dispatch(fetchUser());
  }, [dispatch, user]);

  async function Logout() {
    try {
      interface Response {
        msg: string;
      }

      const res = await fetch(backendRoutes.logout, {
        method: "POST",
        credentials: "include",
      });

      const json: Response = await res.json();
      if (!res.ok) {
        toast(json.msg);
        return;
      }
      toast(json.msg, {
        description: "redirecting to login page",
      });
      router.push(routes.login);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      }
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)}>
        <Avatar>
          <AvatarFallback>
            {user?.userName?.charAt(0).toUpperCase()}
          </AvatarFallback>
          <AvatarImage src={user?.profileImage} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 ">
        <DropdownMenuItem
          className="gap-4 p-2  cursor-pointer flex items-center "
          onClick={() => router.push("/site/profile")}
        >
          <Avatar>
            <AvatarFallback>
              {user?.userName?.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage src={user?.profileImage} />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg">{user?.userName}</h1>
            <h2 className="text-foreground/60">{user?.role}</h2>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Settings /> Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={Logout}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
