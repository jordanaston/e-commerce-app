import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LoginUser from "../LoginUser";
import CreateUser from "../CreateUser";
import { useRef } from "react";
import { useGetUserInfo } from "@/hooks/getUserInfo";

const MenuButtons = () => {
  const { user } = useGetUserInfo();

  const displayPopoverRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex items-center space-x-4 pl-8">
        {user && (
          <>
            <Link href="/" passHref>
              <Button
                variant="default"
                className="bg-transparent shadow-none hover:text-grey-500"
              >
                Store
              </Button>
            </Link>

            <Link href="/orders" passHref>
              <Button
                variant="default"
                className="bg-transparent shadow-none hover:text-grey-500"
              >
                Orders
              </Button>
            </Link>
          </>
        )}

        {!user && (
          <Popover>
            <PopoverTrigger asChild ref={displayPopoverRef}>
              <Button
                variant="default"
                className="bg-transparent shadow-none hover:text-grey-500"
              >
                Sign Up
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col bg-accent-foreground w-[350px] p-4 mr-12 mt-4">
              <CreateUser
                closePopover={() => displayPopoverRef.current?.click()}
              />
            </PopoverContent>
          </Popover>
        )}
        <Popover>
          <PopoverTrigger asChild ref={displayPopoverRef}>
            {user ? (
              <Button
                variant="default"
                className="bg-transparent shadow-none hover:text-grey-500"
              >
                @{user.username}
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-transparent shadow-none hover:text-grey-500"
              >
                Login
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col bg-accent-foreground w-[350px] p-4 mr-12 mt-4">
            <LoginUser
              closePopover={() => displayPopoverRef.current?.click()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default MenuButtons;
