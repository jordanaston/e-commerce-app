import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { user, loginUser, logoutUser } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values.username);
  }

  return user ? (
    <div className="text-white">
      <h2>Welcome, {user.username}!</h2>
      <Button onClick={logoutUser} className="mt-4 mx-auto block">
        Logout
      </Button>
    </div>
  ) : (
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
            <FormDescription>This is your password.</FormDescription>
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
