import { useEffect, useState } from "react";
import { useTicketStore } from "@/store/useTicketStore";
import TicketCard from "./TicketCard";
import BatchActions from "./BatchActions";
import SortControl from "@/components/common/SortControl";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Inbox } from "lucide-react";
import type { Ticket } from "@/types/ticket";

interface TicketListProps {
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export default function TicketList({ onEdit, onDelete }: TicketListProps) {
  const {
    tickets,
    isLoading,
    error,
    fetchTickets,
    toggleComplete,
    removeTagFromTicket,
  } = useTicketStore();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBatchMode, setIsBatchMode] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg font-semibold text-gray-700">加载失败</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  const handleSelect = (ticketId: number, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, ticketId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== ticketId));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
    setIsBatchMode(false);
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Inbox className="h-16 w-16 text-gray-300 mb-4" />
        <p className="text-lg font-semibold text-gray-700">暂无 Ticket</p>
        <p className="text-sm text-gray-500">点击右上角按钮创建新的 Ticket</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isBatchMode && (
            <button
              onClick={() => setIsBatchMode(true)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              批量操作
            </button>
          )}
        </div>
        <SortControl />
      </div>

      {/* Batch Actions */}
      {isBatchMode && (
        <BatchActions
          selectedIds={selectedIds}
          onClearSelection={handleClearSelection}
        />
      )}

      {/* Ticket List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={(t) => toggleComplete(t.id)}
            onRemoveTag={removeTagFromTicket}
            isSelected={selectedIds.includes(ticket.id)}
            onSelect={isBatchMode ? handleSelect : undefined}
            showCheckbox={isBatchMode}
          />
        ))}
      </div>
    </div>
  );
}
