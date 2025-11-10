import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "sonner";
import TagSelector from "@/components/tags/TagSelector";
import type { Ticket } from "@/types/ticket";

interface TicketFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: Ticket | null;
}

export default function TicketForm({
  open,
  onOpenChange,
  ticket,
}: TicketFormProps) {
  const { createTicket, updateTicket } = useTicketStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag_ids: [] as number[],
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description || "",
        tag_ids: ticket.tags.map((tag) => tag.id),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        tag_ids: [],
      });
    }
  }, [ticket, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("请输入 Ticket 标题");
      return;
    }

    setIsSubmitting(true);

    try {
      if (ticket) {
        await updateTicket(ticket.id, {
          title: formData.title,
          description: formData.description || undefined,
        });
        toast.success("Ticket 已更新");
      } else {
        await createTicket(formData);
        toast.success("Ticket 已创建");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(ticket ? "更新 Ticket 失败" : "创建 Ticket 失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{ticket ? "编辑 Ticket" : "创建 Ticket"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="输入 Ticket 标题"
              maxLength={255}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="输入 Ticket 描述（可选）"
              rows={5}
              maxLength={10000}
            />
          </div>

          {!ticket && (
            <TagSelector
              selectedTagIds={formData.tag_ids}
              onChange={(tag_ids) => setFormData({ ...formData, tag_ids })}
            />
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : ticket ? "更新" : "创建"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
