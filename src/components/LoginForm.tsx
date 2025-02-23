import { trpc } from "../utils/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const mutation = trpc.user.login.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values, {
      onSuccess: async (token) => {
        await localStorage.setItem("token", token);
        const storedToken = await localStorage.getItem("token");
        console.log("Retrieved token from storage:", storedToken);
      },
    });
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Username</FormLabel>
            <FormControl>
              <Input {...field} className="text-white" />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel className="text-white">Password</FormLabel>
            <FormControl>
              <Input {...field} className="text-white" />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="mt-4"
      >
        Login
      </Button>
    </Form>
  );
}
