"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function NotFound() {
    const {replace,back}=useRouter()
    
  return (
    <div className={"h-svh w-full"}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="text-[7rem] font-bold leading-tight">
404
          </h1>
        <span className="font-bold text-3xl">
        Not Found
        </span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => back()}>
              Go Back
            </Button>
            <Button onClick={() => replace("/")}>Back to Home</Button>
          </div>
      </div>
    </div>
  );
}