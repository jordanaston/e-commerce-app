import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center relative">
      <input
        type="text"
        placeholder="Search online store..."
        className="rounded-l-md p-2 w-full placeholder-grey-500"
      />
      <div className="flex items-center bg-grey-500 p-3 rounded-r cursor-pointer">
        <FaSearch color="white" />
      </div>
    </div>
  );
}
