"use client"
import React from "react";
import { cn } from "@/lib/utils";
import useSidebar from "@/hooks/use-sidebar";
import { ScrollArea } from '@/components/ui/scroll-area'

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {

  const { isOpen } = useSidebar()
  return (

    <ScrollArea
      className={cn(className, `${isOpen ? "sm:ml-36" : "sm:ml-12"}  p-2 overflow-y-auto h-[100vh] `)}
    >
      {children}
    </ScrollArea>
  );
};

export default Container;