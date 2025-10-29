import { Agent } from '@/types/agent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Calendar, Tag } from 'lucide-react';

interface AgentDetailModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onActivate?: (agentId: string) => void;
}

export const AgentDetailModal = ({ agent, isOpen, onClose, onActivate }: AgentDetailModalProps) => {
  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{agent.icon}</div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{agent.name}</DialogTitle>
              <DialogDescription className="text-base">
                {agent.shortDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-medium">{agent.rating}</span>
              <span className="text-muted-foreground">Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-secondary" />
              <span className="font-medium">{agent.usageCount.toLocaleString()}</span>
              <span className="text-muted-foreground">Users</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Created {new Date(agent.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <Badge variant="secondary">{agent.category}</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">About this Agent</h3>
            <p className="text-muted-foreground leading-relaxed">{agent.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Developed by <span className="font-medium text-foreground">{agent.createdBy}</span>
            </p>
            <div className="flex gap-3">
              <Button variant="gradient" className="flex-1" onClick={() => onActivate?.(agent.id)}>
                Get Agent
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
