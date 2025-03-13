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

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .regex(/^\S*$/, { message: "Username cannot contain spaces" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginUserForm() {
  const utils = trpc.useUtils();
  const [token] = useLocalStorage("token");

  const { data: user } = trpc.user.getLoggedInUser.useQuery(undefined, {
    retry: false,
    enabled: !!token,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginUser = trpc.user.loginUser.useMutation({
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      form.reset();
      utils.user.getLoggedInUser.invalidate();
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to login. Please try again.");
      form.reset();
    },
  });

  const logoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    utils.user.getLoggedInUser.invalidate();
    utils.user.getLoggedInUser.reset();
    toast.success("Logout successful!");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser.mutate({
      username: values.username,
      password: values.password,
    });
  }
  return user ? (
    <div className="text-white">
      <h2>Welcome, {user.username}!</h2>
      <p className="text-white/70 text-sm mt-2">
        This is a simple e-commerce-app designed to represent a real-world
        application. It&apos;s purpose is to showcase the following
        technologies:
      </p>
      <ul className="text-white/70 list-disc list-inside my-2">
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Trpc</li>
        <li>MongoDB</li>
        <li>Tailwind CSS</li>
        <li>Shadcn UI</li>
        <li>Zod</li>
      </ul>
      <p className="text-white/70 text-sm mt-2">
        Please feel free to look around and test the app. You can do the
        following...
      </p>
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
        disabled={loginUser.isPending || !form.formState.isValid}
      >
        {loginUser.isPending ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
}
