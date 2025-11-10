import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "sonner";
import { CheckCircle2, Trash2, X } from "lucide-react";

interface BatchActionsProps {
  selectedIds: number[];
  onClearSelection: () => void;
}

export default function BatchActions({
  selectedIds,
  onClearSelection,
}: BatchActionsProps) {
  const { batchComplete, batchDelete } = useTicketStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBatchComplete = async () => {
    if (selectedIds.length === 0) return;

    setIsProcessing(true);
    try {
      await batchComplete(selectedIds);
      toast.success(`已标记 ${selectedIds.length} 个 Ticket 为已完成`);
      onClearSelection();
    } catch (error) {
      toast.error("批量完成失败");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    if (
      !confirm(
        `确定要删除选中的 ${selectedIds.length} 个 Ticket 吗？此操作无法撤销。`,
      )
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      await batchDelete(selectedIds);
      toast.success(`已删除 ${selectedIds.length} 个 Ticket`);
      onClearSelection();
    } catch (error) {
      toast.error("批量删除失败");
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            已选择 {selectedIds.length} 项
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" />
            取消选择
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBatchComplete}
            disabled={isProcessing}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            批量完成
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBatchDelete}
            disabled={isProcessing}
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            批量删除
          </Button>
        </div>
      </div>
    </div>
  );
}
