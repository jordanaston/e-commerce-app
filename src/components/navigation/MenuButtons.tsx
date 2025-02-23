import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function MenuButtons() {
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
            <Button variant="default" className="bg-transparent shadow-none">
              Login
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col bg-accent-foreground w-[400px] p-4 mr-12 mt-4">
            <div className="text-white mb-4">Login</div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="mt-2 p-2 rounded bg-transparent border-2 border-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="mt-2 p-2 rounded bg-transparent border-2 border-white"
              />
            </div>
            <Button variant="default" className="mt-4">
              Login
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
