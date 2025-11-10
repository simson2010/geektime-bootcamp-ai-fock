import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import SearchBar from "@/components/common/SearchBar";
import TagManager from "@/components/tags/TagManager";

interface HeaderProps {
  onNewTicket: () => void;
  onToggleSidebar?: () => void;
  searchInputRef?: React.Ref<HTMLInputElement>;
}

export default function Header({
  onNewTicket,
  onToggleSidebar,
  searchInputRef,
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            Project Alpha
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <SearchBar inputRef={searchInputRef} />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <TagManager />
          </div>
          <Button onClick={onNewTicket} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">新建 Ticket</span>
            <span className="sm:hidden">新建</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar inputRef={searchInputRef} />
      </div>
    </header>
  );
}
