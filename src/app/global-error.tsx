"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { replace, back } = useRouter();
  return (
    <html>
      <body>
        <div className={"h-svh w-full"}>
          <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
            <span className="font-bold text-xl">{error.message}</span>
            <p className="text-center text-muted-foreground">
              We apologize for the inconvenience. <br /> Please try again later.
            </p>
            
            <div className="mt-6 flex gap-4">
              <Button variant="outline" onClick={() => back()}>
                Go Back
              </Button>
              <Button onClick={() => replace("/")} variant="outline">Back to Home</Button>
              <Button onClick={() => reset()}>Try again</Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
