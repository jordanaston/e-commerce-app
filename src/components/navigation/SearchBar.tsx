import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center relative">
      <input
        type="text"
        placeholder="Search online store..."
        className="rounded-md p-2 w-full placeholder-gray-500"
      />
      <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gray-500 p-3 rounded-r cursor-pointer">
        <FaSearch color="white" />
      </div>
    </div>
  );
}
