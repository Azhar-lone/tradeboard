import React from "react";
import { cn } from "@/lib/utils";

//import Icons
//shadcn  components
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,

} from "@/components/ui/dropdown-menu";

// Icons

import { BellIcon } from "lucide-react";

// context

const Notifications: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn(className)}>
                <BellIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Notifications
                </DropdownMenuLabel>
                {notifications.map((notification, index) => (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem key={index}>
                            {notification}
                        </DropdownMenuItem>
                    </>
                ))}
            </DropdownMenuContent>


        </DropdownMenu>
    );
};

export default Notifications;


const notifications = [
    "first notification",
    "second notification",
    "third notification",
    "fourth notification",
    "fifth notification",
    "sixth notification notification notification notification notification notification notification",


]