import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LoginForm from "../LoginForm";
import { useAuth } from "@/context/AuthContext";

export default function MenuButtons() {
  const { user } = useAuth();

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
            <LoginForm />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
