"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// importing components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Custom components
import { ModeToggle } from "@/components/myUi/mode-toggle";

const ForgotPassword = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof EmailSchema>) {
    console.log(values);
  }

  return (
    <div className="md:w-[60%] w-[100%] mt-[10vh] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl shadow-primary">
      <div className="w-fit">
        <ModeToggle />
      </div>
      <h3>Send code </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={"enter Your email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {!isLoading ? */}
          <Button type="submit">Send Code </Button>
          {/* : */}
          {/* <Button >Sending otp ...  </Button>} */}
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), // email format validation and message
});
