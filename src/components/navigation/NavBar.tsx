import MenuButtons from "./MenuButtons";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="flex justify-end p-8 bg-accent-foreground">
      <SearchBar />
      <MenuButtons />
    </div>
  );
}
