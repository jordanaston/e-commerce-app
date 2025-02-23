import DeliveryLocation from "./DeliveryLocation";
import MenuButtons from "./MenuButtons";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="flex justify-end p-8 bg-accent-foreground">
      <DeliveryLocation />
      <SearchBar />
      <MenuButtons />
    </div>
  );
}
