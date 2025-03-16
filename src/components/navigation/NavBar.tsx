import Image from "next/image";
import DeliveryLocation from "./DeliveryLocation";
import MenuButtons from "./MenuButtons";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-4 sm:p-8 bg-accent-foreground w-full">
        <div className="flex items-center justify-between w-full sm:w-auto sm:mr-6">
          <Image
            src="/business-name.svg"
            alt="Business Name"
            className="w-[100px] sm:w-[120px] h-auto cursor-pointer hover:opacity-60 transition-opacity"
            width={120}
            height={120}
            priority
            onClick={() => router.push("/")}
          />
          <div className="block sm:hidden">
            <MenuButtons />
          </div>
        </div>

        <div className="hidden lg:block">
          <DeliveryLocation />
        </div>

        <div className="w-full sm:flex-1">
          <SearchBar />
        </div>

        <div className="hidden sm:block">
          <MenuButtons />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
