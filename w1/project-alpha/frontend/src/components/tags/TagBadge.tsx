import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Tag } from "@/types/tag";

interface TagBadgeProps {
  tag: Tag;
  removable?: boolean;
  onRemove?: () => void;
}

export default function TagBadge({
  tag,
  removable = false,
  onRemove,
}: TagBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="inline-flex items-center gap-1"
      style={{
        backgroundColor: tag.color + "20",
        color: tag.color,
        borderColor: tag.color,
      }}
    >
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: tag.color }}
      />
      <span>{tag.name}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-red-600"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
