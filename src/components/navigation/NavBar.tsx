import Image from "next/image";
import DeliveryLocation from "./DeliveryLocation";
import MenuButtons from "./MenuButtons";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <>
      <div className="flex justify-between p-8 bg-accent-foreground">
        <Image
          src="/business-name.svg"
          alt="Business Name"
          className="mr-8"
          width={120}
          height={0}
        />
        <div className="hidden lg:block">
          <DeliveryLocation />
        </div>
        <SearchBar />
        <MenuButtons />
      </div>
    </>
  );
}
