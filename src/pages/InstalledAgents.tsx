import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/components/AgentCard';
import { Agent } from '@/types/agent';
import { Home, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const InstalledAgents = () => {
  const navigate = useNavigate();
  const [installedAgents, setInstalledAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem('installedAgents') || '[]');
    setInstalledAgents(savedAgents);
  }, []);

  const handleUninstall = (id: string) => {
    const updated = installedAgents.filter((agent) => agent.id !== id);
    setInstalledAgents(updated);
    localStorage.setItem('installedAgents', JSON.stringify(updated));
    toast.success('Agent successfully uninstalled.');
  };

  const handleRunAgent = (agent: Agent) => {
    toast.info(`🚀 Running ${agent.name}...`);
  };

  return (
    <div style={{ backgroundColor: '#0b1120', minHeight: '100vh' }} className="text-slate-100">
      {/* Header */}
      <header
        style={{ backgroundColor: 'rgba(9, 15, 30, 0.9)' }}
        className="backdrop-blur-md border-b border-cyan-400/10 sticky top-0 z-20"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/user/dashboard')}
              className="bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/25 hover:text-cyan-200 rounded-lg transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-cyan-300">Installed Agents</h1>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/25 hover:text-cyan-200 rounded-lg transition-all"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Installed Agents */}
      <div className="container mx-auto px-4 py-8">
        {installedAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-[#111827]/60 rounded-xl p-4 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.15)] transition-all duration-300"
              >
                {/* Show Run button inside the card */}
                <AgentCard
                  agent={agent}
                  showRunButton={true}
                  onRun={(a) => handleRunAgent(a)}
                />

                <div className="mt-4 flex">
                  <Button
                    onClick={() => handleUninstall(agent.id)}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/10 text-red-300 border border-red-500/50 hover:bg-red-500/25 hover:text-red-200 hover:border-red-400 flex-1 transition-all"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Uninstall
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No installed agents yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstalledAgents;
