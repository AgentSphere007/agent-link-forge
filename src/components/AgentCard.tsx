import { Agent } from '@/types/agent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 border-border bg-card"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{agent.icon}</div>
          <Badge variant="secondary" className="text-xs">
            {agent.category}
          </Badge>
        </div>
        <CardTitle className="text-xl">{agent.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {agent.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-medium">{agent.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{agent.usageCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {agent.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
