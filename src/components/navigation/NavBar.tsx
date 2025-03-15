import Image from "next/image";
import DeliveryLocation from "./DeliveryLocation";
import MenuButtons from "./MenuButtons";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between p-8 bg-accent-foreground">
        <Image
          src="/business-name.svg"
          alt="Business Name"
          className="mr-8 cursor-pointer w-[120px] h-auto transition-colors hover:opacity-60"
          width={120}
          height={120}
          priority
          onClick={() => router.push("/")}
        />
        <div className="hidden lg:block">
          <DeliveryLocation />
        </div>
        <SearchBar />
        <MenuButtons />
      </div>
    </>
  );
};

export default NavBar;
