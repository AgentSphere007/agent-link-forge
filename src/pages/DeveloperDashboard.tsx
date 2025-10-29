import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAgents } from "@/data/mockAgents";
import { Agent } from "@/types/agent";
import { Plus, Home, ArrowLeft, Edit, Trash2, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  // const [agents, setAgents] = useState<Agent[]>(mockAgents.slice(0, 3));
  const [agents, setAgents] = useState<Agent[]>([]);
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);
  const [devAgents, setDevAgents] = useState([]);

  useEffect(() => {
    const devName = localStorage.getItem("username");
    const fillAgents = async () => {
      try {
        console.log("check devs");
        const response = await fetch(
          "http://10.52.221.162:8000/api/repo/" + devName,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

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

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter((agent) => agent.id !== agentId));
    toast.success("Agent deleted successfully");
    setDeleteAgentId(null);
  };

  const handleEditAgent = (agentId: string) => {
    navigate(`/developer/edit/${agentId}`);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* Header */}
      <header className="bg-[#0f172a]/90 backdrop-blur-md border-b border-cyan-400/20 sticky top-0 z-10 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/mode-select")}
                className="bg-slate-800/70 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-cyan-300">
                Developer Dashboard
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-gradient-to-r from-blue-700 to-cyan-400 hover:shadow-[0_0_20px_4px_rgba(0,255,255,0.5)] text-white transition-all"
                onClick={() => navigate("/developer/create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Agent
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/")}
                className="bg-slate-800/70 border border-slate-700 hover:bg-cyan-500/20 text-cyan-300 rounded-lg transition-all"
              >
                <Home className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/60 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cyan-300">
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {agents.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cyan-300">
                Total Users
              </CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="text-3xl font-bold text-white">
                {agents
                  .reduce((sum, agent) => sum + agent.usageCount, 0)
                  .toLocaleString()}
              </div>
            </CardContent> */}
          </Card>

          <Card className="bg-slate-900/60 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cyan-300">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {(
                  agents.reduce((sum, agent) => sum + agent.rating, 0) /
                  agents.length
                ).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Your Agents</h2>

          {agents.length === 0 ? (
            <Card className="p-12 text-center bg-slate-900/70 border border-cyan-400/20">
              <CardDescription className="text-lg mb-4 text-slate-300">
                You haven’t created any agents yet
              </CardDescription>
              <Button
                className="bg-gradient-to-r from-blue-700 to-cyan-400 hover:shadow-[0_0_20px_4px_rgba(0,255,255,0.5)] text-white transition-all"
                onClick={() => navigate("/developer/create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Agent
              </Button>
            </Card>
          ) : (
            agents.map((agent) => (
              <Card
                key={agent.id}
                className="bg-slate-900/70 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all duration-300 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* <div className="text-4xl">{agent.icon}</div> */}
                      <div>
                        <CardTitle className="text-xl mb-2 text-white">
                          {agent.model_name}
                        </CardTitle>
                        <CardDescription className="text-base text-slate-300">
                          {agent.shortDescription}
                        </CardDescription>
                        {/* <div className="flex gap-2 mt-2">
                          <Badge className="bg-cyan-500/80 text-white border-none">
                            {agent.category}
                          </Badge>
                          {agent.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              className="border border-cyan-400/30 text-cyan-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div> */}
                      </div>
                    </div>

                    {/* Fixed Edit/Delete Buttons with Glow */}
                    <div className="flex gap-2">
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditAgent(agent.id)}
                        className="bg-slate-800/70 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_15px_3px_rgba(0,255,255,0.6)] border border-slate-700 rounded-lg transition-all duration-300"
                        aria-label={`Edit ${agent.model_name}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button> */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteAgentId(agent.id)}
                        className="bg-slate-800/70 text-rose-400 hover:bg-rose-600/30 hover:shadow-[0_0_15px_3px_rgba(255,0,80,0.6)] border border-slate-700 rounded-lg transition-all duration-300"
                        aria-label={`Delete ${agent.model_name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    {/* <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                      <span>{agent.usageCount.toLocaleString()} users</span>
                    </div> */}
                    <div>Rating: {agent.rating}/5.0</div>
                    {/* <div>
                      Created {new Date(agent.createdAt).toLocaleDateString()}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteAgentId !== null}
        onOpenChange={() => setDeleteAgentId(null)}
      >
        <AlertDialogContent className="bg-slate-900 border border-rose-500/30 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              This action cannot be undone. This will permanently delete your
              agent and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-200 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAgentId && handleDeleteAgent(deleteAgentId)}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeveloperDashboard;
