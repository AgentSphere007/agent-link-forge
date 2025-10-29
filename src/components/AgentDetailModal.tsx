import { Agent } from "@/types/agent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Calendar, Tag } from "lucide-react";

interface AgentDetailModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onActivate?: (agentId: string) => void;
}

export const AgentDetailModal = ({
  agent,
  isOpen,
  onClose,
  onActivate,
}: AgentDetailModalProps) => {
  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f1622]/95 border border-cyan-400/10 text-slate-100 shadow-[0_20px_60px_-10px_rgba(34,211,238,0.12)]">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Icon circle */}
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_12px_40px_-18px_rgba(34,211,238,0.35)] text-4xl">
              {agent.icon}
            </div>

            <div className="flex-1">
              <DialogTitle className="text-2xl mb-1 text-white">
                {agent.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-300">
                {agent.shortDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Star className="w-4 h-4 text-amber-400" />
              <div>
                <div className="font-medium text-white">{agent.rating}</div>
                <div className="text-xs text-slate-400">Rating</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Users className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="font-medium text-white">
                  {agent.usageCount.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">Users</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Calendar className="w-4 h-4 text-indigo-300" />
              <div>
                <div className="text-xs text-slate-400">Created</div>
                <div className="font-medium text-white">
                  {new Date(agent.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Tag className="w-4 h-4 text-slate-300" />
              <Badge className="bg-cyan-500/80 text-white border-none">
                {agent.category}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">About this Agent</h3>
            <p className="text-slate-300 leading-relaxed">
              {agent.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="text-xs border border-cyan-400/12 text-cyan-300 bg-transparent px-2 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/40">
            <p className="text-sm text-slate-300 mb-4">
              Developed by{" "}
              <span className="font-medium text-white">{agent.createdBy}</span>
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-[0_0_18px_4px_rgba(34,211,238,0.24)] text-white"
                onClick={() => onActivate?.(agent.id)}
              >
                Get Agent
              </Button>

              <Button
                variant="ghost"
                onClick={onClose}
                className="border border-slate-700 bg-[#0f172a]/50 text-slate-100 hover:bg-slate-700/40"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
