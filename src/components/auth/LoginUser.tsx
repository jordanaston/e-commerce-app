import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserDetails from "./UserDetails";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .regex(/^\S*$/, { message: "Username cannot contain spaces" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const LoginUser = ({ closePopover }: { closePopover: () => void }) => {
  const utils = trpc.useUtils();
  const { user } = useGetUserInfo();
  const [, setToken] = useLocalStorage("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginUser = trpc.user.loginUser.useMutation({
    onSuccess: async (data) => {
      setToken(data.token);
      await utils.user.getLoggedInUser.invalidate();
      const loggedInUser = await utils.user.getLoggedInUser.fetch();
      if (loggedInUser) {
        form.reset();
        toast.success("Login successful!");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to login. Please try again.");
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser.mutate({
      username: values.username,
      password: values.password,
    });
  }
  return user ? (
    <UserDetails closePopover={closePopover} />
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
        className="mt-4 hover:text-grey-500"
        disabled={loginUser.isPending || !form.formState.isValid}
      >
        {loginUser.isPending ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginUser;
