import { useGetUserInfo } from "@/hooks/getUserInfo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";

const UserDetails = ({ closePopover }: { closePopover: () => void }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const utils = trpc.useUtils();
  const { user } = useGetUserInfo();
  const [, setToken] = useLocalStorage("token");

  const logoutUser = async () => {
    setIsLoggingOut(true);
    setToken(null);
    await utils.user.getLoggedInUser.reset();
    router.push("/");
    toast.success("Logout successful!");
    setIsLoggingOut(false);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center">
        <h2>Welcome, {user?.username}!</h2>
        <Button onClick={() => closePopover()} className="hover:text-grey-500">
          <IoClose />
        </Button>
      </div>
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
      <Button
        onClick={logoutUser}
        className="mt-4 mx-auto block hover:text-grey-500"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default UserDetails;
