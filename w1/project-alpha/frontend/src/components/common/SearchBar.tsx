import { useEffect, useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useTicketStore } from "@/store/useTicketStore";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  inputRef?: React.Ref<HTMLInputElement>;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const { searchQuery, setSearchQuery, fetchTickets } = useTicketStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    fetchTickets();
  }, 300);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
    fetchTickets();
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        ref={ref}
        type="text"
        placeholder="搜索 Ticket... (Ctrl+K)"
        value={localQuery}
        onChange={handleChange}
        className="pl-10 pr-10"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
