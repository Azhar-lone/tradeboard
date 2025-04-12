"use client";

import React, { createContext, useContext, useState } from "react";

interface sideContextState {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: sideContextState = {
    isOpen: true,
    setIsOpen: () => {}, 
};

const sideContext = createContext<sideContextState>(initialState);

export default function useSidebar() {
    return useContext(sideContext);
}

interface loadingProps {
    children: React.ReactNode;
}

export function SidebarProvider({ children }: loadingProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <sideContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </sideContext.Provider>
    );
}
