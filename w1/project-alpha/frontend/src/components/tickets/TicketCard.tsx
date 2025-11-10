import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Ticket } from "@/types/ticket";
import TagBadge from "@/components/tags/TagBadge";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
  onToggleComplete: (ticket: Ticket) => void;
  onRemoveTag?: (ticketId: number, tagId: number) => void;
  isSelected?: boolean;
  onSelect?: (ticketId: number, selected: boolean) => void;
  showCheckbox?: boolean;
}

export default function TicketCard({
  ticket,
  onEdit,
  onDelete,
  onToggleComplete,
  onRemoveTag,
  isSelected = false,
  onSelect,
  showCheckbox = false,
}: TicketCardProps) {
  const isCompleted = ticket.status === "completed";

  return (
    <Card
      className={cn(
        "p-4 transition-all hover:shadow-md",
        isCompleted && "opacity-60",
        isSelected && "ring-2 ring-blue-500",
      )}
    >
      <div className="flex items-start gap-3">
        {showCheckbox && onSelect ? (
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) =>
              onSelect(ticket.id, checked as boolean)
            }
            className="mt-1"
          />
        ) : (
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(ticket)}
            className="mt-1"
          />
        )}

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "text-lg font-semibold",
                isCompleted && "line-through text-gray-500",
              )}
            >
              {ticket.title}
            </h3>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(ticket)}
                className="h-8 w-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(ticket)}
                className="h-8 w-8 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {ticket.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {ticket.description}
            </p>
          )}

          {ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ticket.tags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  removable={!isCompleted}
                  onRemove={
                    onRemoveTag
                      ? () => onRemoveTag(ticket.id, tag.id)
                      : undefined
                  }
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>
              创建于 {format(new Date(ticket.created_at), "yyyy-MM-dd HH:mm")}
            </span>
            {ticket.completed_at && (
              <span>
                完成于{" "}
                {format(new Date(ticket.completed_at), "yyyy-MM-dd HH:mm")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
