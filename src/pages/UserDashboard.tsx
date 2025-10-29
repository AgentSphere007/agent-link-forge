// src/pages/UserDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/AgentCard";
import { AgentDetailModal } from "@/components/AgentDetailModal";
import { mockAgents } from "@/data/mockAgents";
import { Agent } from "@/types/agent";
import { Search, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fillAgents = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/agents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fillAgents();
  }, []);

  const filteredAgents = mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleActivateAgent = async (agentId: string) => {
    toast.success("Agent activated successfully!");
    try {
      const response = await fetch("http://localhost:5173/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      // inline style to FORCE background color (cannot be overridden by external CSS tokens)
      style={{ backgroundColor: "#0b1120", minHeight: "100vh" }}
      className="text-slate-100"
    >
      {/* Header */}
      <header
        style={{ backgroundColor: "rgba(9, 15, 30, 0.9)" }}
        className="backdrop-blur-md border-b border-cyan-400/10 sticky top-0 z-20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/mode-select")}
                className="bg-[#111524]/60 text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                aria-label="Back to mode select"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-cyan-300">
                User Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-sm text-slate-300 mr-2">
                Welcome back ✨
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/")}
                className="bg-[#111524]/60 border border-slate-700 text-slate-100/90 hover:bg-cyan-500/10 rounded-lg transition-all"
                aria-label="Go home"
              >
                <Home className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search agents by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // inline style for input background to ensure it's visible
              style={{
                backgroundColor: "rgba(15,23,42,0.6)",
                color: "#E6EEF3",
              }}
              className="pl-10 border border-[#1f2937] placeholder:text-slate-400 focus:border-[#2dd4bf] focus:ring-0"
            />
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="transform hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.12)] transition-all duration-300"
            >
              <AgentCard
                agent={agent}
                onClick={() => handleAgentClick(agent)}
              />
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No agents found matching your search.
            </p>
          </div>
        )}
      </div>

      <AgentDetailModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onActivate={handleActivateAgent}
      />
    </div>
  );
};

export default UserDashboard;
