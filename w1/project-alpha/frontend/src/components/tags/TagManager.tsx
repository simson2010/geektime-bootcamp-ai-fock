import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generateRandomColor } from "@/lib/colorUtils";

export default function TagManager() {
  const { tags, createTag, deleteTag } = useTicketStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error("请输入标签名称");
      return;
    }

    if (
      tags.some((tag) => tag.name.toLowerCase() === newTagName.toLowerCase())
    ) {
      toast.error("标签已存在");
      return;
    }

    setIsCreating(true);
    try {
      await createTag({
        name: newTagName.trim(),
        color: generateRandomColor(),
      });
      setNewTagName("");
      toast.success("标签创建成功");
    } catch (error) {
      toast.error("创建标签失败");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTag = async (tagId: number, tagName: string) => {
    if (
      !confirm(
        `确定要删除标签 "${tagName}" 吗？这将从所有关联的 Ticket 中移除该标签。`,
      )
    ) {
      return;
    }

    try {
      await deleteTag(tagId);
      toast.success("标签已删除");
    } catch (error) {
      toast.error("删除标签失败");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        管理标签
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>标签管理</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Create New Tag */}
            <div className="space-y-2">
              <Label>创建新标签</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入标签名称"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateTag();
                    }
                  }}
                  maxLength={50}
                />
                <Button
                  onClick={handleCreateTag}
                  disabled={isCreating || !newTagName.trim()}
                >
                  {isCreating ? "创建中..." : "创建"}
                </Button>
              </div>
            </div>

            {/* Tags List */}
            <div className="space-y-2">
              <Label>现有标签 ({tags.length})</Label>
              <div className="max-h-64 overflow-y-auto space-y-2 border rounded-md p-3">
                {tags.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    暂无标签
                  </p>
                ) : (
                  tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
                    >
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
                        {tag.ticket_count !== undefined && (
                          <span className="text-xs ml-1">
                            ({tag.ticket_count})
                          </span>
                        )}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTag(tag.id, tag.name)}
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
