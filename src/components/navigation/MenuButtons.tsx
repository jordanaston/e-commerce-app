import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LoginUserForm from "../LoginUserForm";
import CreateUserForm from "../CreateUserForm";
import { trpc } from "@/utils/trpc";
import { useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function MenuButtons() {
  const [token] = useLocalStorage("token");
  const { data: user } = trpc.user.getLoggedInUser.useQuery(undefined, {
    retry: false,
    enabled: !!token,
  });

  const popoverRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex items-center space-x-4 pl-8">
        <Link href="/" passHref>
          <Button variant="default" className="bg-transparent shadow-none">
            Store
          </Button>
        </Link>

        <Link href="/orders" passHref>
          <Button variant="default" className="bg-transparent shadow-none">
            Orders
          </Button>
        </Link>

        <Popover>
          <PopoverTrigger asChild ref={popoverRef}>
            <Button variant="default" className="bg-transparent shadow-none">
              Sign Up
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col bg-accent-foreground w-[350px] p-4 mr-12 mt-4">
            <CreateUserForm onSuccess={() => popoverRef.current?.click()} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            {user ? (
              <Button variant="default" className="bg-transparent shadow-none">
                @{user.username}
              </Button>
            ) : (
              <Button variant="default" className="bg-transparent shadow-none">
                Login
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col bg-accent-foreground w-[350px] p-4 mr-12 mt-4">
            <LoginUserForm />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
