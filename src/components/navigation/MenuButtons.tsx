import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LoginUser from "../auth/LoginUser";
import { useRef } from "react";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import CreateUser from "../auth/CreateUser";
import { IoCartOutline } from "react-icons/io5";
import TotalQuantityIndicator from "../TotalQuantityIndicator";

const MenuButtons = () => {
  const { user } = useGetUserInfo();
  const displayPopoverRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex items-center space-x-4 pl-8">
        {user && (
          <Link href="/" passHref>
            <Button
              variant="default"
              className="bg-transparent shadow-none hover:text-grey-500"
            >
              Store
            </Button>
          </Link>
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
        {user && (
          <Link href="/orders" passHref>
            <div className="relative inline-flex">
              <IoCartOutline className="text-2xl text-white hover:text-grey-500 transition-colors" />
              <div className="absolute -top-1 -right-1">
                <TotalQuantityIndicator />
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default MenuButtons;
