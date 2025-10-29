import React from 'react';
import { Agent } from '@/types/agent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  // action controls (optional)
  showRunButton?: boolean;
  showGetButton?: boolean;
  onRun?: (agent: Agent) => void;
  onGet?: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onClick,
  showRunButton = false,
  showGetButton = false,
  onRun,
  onGet,
}) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.12)] bg-[#0f1622]/70 border border-cyan-400/10 backdrop-blur-sm"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          {/* icon circle */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_8px_30px_-12px_rgba(34,211,238,0.35)] text-2xl">
              {agent.icon}
            </div>

            <div>
              <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
              <CardDescription className="text-sm text-slate-300 mt-1 line-clamp-2">
                {agent.shortDescription}
              </CardDescription>
            </div>
          </div>

          {/* category badge */}
          <div>
            <Badge className="bg-cyan-500/80 text-white border-none text-xs px-3 py-1">
              {agent.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-slate-300 mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-white">{agent.rating}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>{agent.usageCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {agent.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="text-xs border border-cyan-400/15 text-cyan-300 bg-transparent px-2 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Optional action buttons — rendered only when parent asks for them */}
        {(showRunButton || showGetButton) && (
          <div className="mt-4 flex gap-3">
            {showRunButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRun?.(agent);
                }}
                className="border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10"
              >
                <Rocket className="h-4 w-4 mr-1" /> Run
              </Button>
            )}

            {showGetButton && (
              <Button
                variant="gradient"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onGet?.(agent);
                }}
                className="ml-auto"
              >
                Get Agent
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
