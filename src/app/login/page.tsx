"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Icons
import { Eye, EyeOff } from "lucide-react";

// importing components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// imporring my components
import { ModeToggle } from "@/components/myUi/mode-toggle";

// importing context

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);



  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {

  }

  return (
    <div className="md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl shadow-primary mt-[5vh] animate-accordion-down ">
      <div className="w-fit">
        <ModeToggle />
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
        Log in to your Account
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={"YourEmail@domain.com"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}

          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    type={!showPassword ? "password" : "text"}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-8"
                >
                  {!showPassword ? <Eye /> : <EyeOff />}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between w-[100%]">
            <p></p>
            {!isLoading ? (
              <Button type="submit" className="md:ml-[10%] ml-[30%]">
                Login{" "}
              </Button>
            ) : (
              <Button>
                Loggin In ...
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() =>
                router.push("/auth/forget-password")
              }
            >
              Forgot Password
            </Button>
          </div>
        </form>
      </Form>

      <div>
        did'nt have an account
        <Link href={"/auth/sign-in"} className="text-blue-500 p-2 hover:text-blue-400">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password cannot exceed 16 characters" }),
});
