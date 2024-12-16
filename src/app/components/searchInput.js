import { SearchIcon } from "./searchIcon";

export const SearchInput = ({ search, onChangeText, onPressEnter }) => {
  return (
    <div className="w-[567px] h-[80px]  rounded-[48px] bg-[#FFFFFF] flex items-center p-10 gap-6 mt-10">
      <SearchIcon />
      <input
        value={search}
        onChange={onChangeText}
        onKeyDown={onPressEnter}
        className="text-[20px] font-[700] outline-none  "
        type="search"
        placeholder="Search for a city"
      ></input>
    </div>
  );
};
