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
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trpc } from "@/utils/trpc";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be less than 20 characters." })
    .regex(/^\S*$/, { message: "Username cannot contain spaces" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export default function CreateUser({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const createUser = trpc.user.createUser.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("User created successfully. Please login!");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser.mutate({
        username: values.username,
        password: values.password,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
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
            <FormDescription>This is your password.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="mt-4"
        disabled={createUser.isPending || !form.formState.isValid}
      >
        {createUser.isPending ? "Creating..." : "Create User"}
      </Button>
    </Form>
  );
}
