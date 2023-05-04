import { BsSearch } from "react-icons/bs";

type props = {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar(props: props) {
  return (
    <div className="mb-3 flex flex-row items-center gap-2 px-4 rounded-3xl border bg-white mt-6">
      <input
        type="search"
        name="search"
        value={props.search}
        onChange={props.onChange}
        placeholder="Buscar"
        className="w-full bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <BsSearch>Search</BsSearch>
    </div>
  );
}
