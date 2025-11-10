import { useTicketStore } from "@/store/useTicketStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ListTodo, X } from "lucide-react";
import { cn } from "@/lib/utils";
import TagManager from "@/components/tags/TagManager";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  const {
    tags,
    statusFilter,
    selectedTagIds,
    setStatusFilter,
    setSelectedTagIds,
    reset,
  } = useTicketStore();

  const toggleTagSelection = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  return (
    <aside
      className={cn(
        "w-64 border-r bg-gray-50 p-4 transition-transform",
        "lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "fixed inset-y-0 left-0 z-30 lg:relative",
      )}
    >
      {onClose && (
        <div className="flex justify-end mb-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-700">状态</h3>
          <div className="space-y-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                statusFilter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <ListTodo className="h-4 w-4" />
              全部
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                statusFilter === "pending"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Circle className="h-4 w-4" />
              待完成
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                statusFilter === "completed"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <CheckCircle2 className="h-4 w-4" />
              已完成
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-700">标签</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTagSelection(tag.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  selectedTagIds.includes(tag.id)
                    ? "bg-blue-100"
                    : "hover:bg-gray-100",
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span>{tag.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {tag.ticket_count || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {(statusFilter !== "all" || selectedTagIds.length > 0) && (
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="w-full"
          >
            清除筛选
          </Button>
        )}

        {/* Tag Manager (Mobile) */}
        <div className="md:hidden pt-4 border-t">
          <TagManager />
        </div>
      </div>
    </aside>
  );
}
