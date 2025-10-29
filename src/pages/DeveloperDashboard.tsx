import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAgents } from '@/data/mockAgents';
import { Agent } from '@/types/agent';
import { Plus, Home, ArrowLeft, Edit, Trash2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>(mockAgents.slice(0, 3)); // Developer's agents
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
    toast.success('Agent deleted successfully');
    setDeleteAgentId(null);
  };

  const handleEditAgent = (agentId: string) => {
    navigate(`/developer/edit/${agentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/mode-select')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Developer Dashboard</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="gradient"
                onClick={() => navigate('/developer/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Agent
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('/')}
              >
                <Home className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{agents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {agents.reduce((sum, agent) => sum + agent.usageCount, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Agents</h2>
          
          {agents.length === 0 ? (
            <Card className="p-12 text-center">
              <CardDescription className="text-lg mb-4">
                You haven't created any agents yet
              </CardDescription>
              <Button variant="gradient" onClick={() => navigate('/developer/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Agent
              </Button>
            </Card>
          ) : (
            agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{agent.icon}</div>
                      <div>
                        <CardTitle className="text-xl mb-2">{agent.name}</CardTitle>
                        <CardDescription className="text-base">
                          {agent.shortDescription}
                        </CardDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{agent.category}</Badge>
                          {agent.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditAgent(agent.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteAgentId(agent.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>{agent.usageCount.toLocaleString()} users</span>
                    </div>
                    <div>Rating: {agent.rating}/5.0</div>
                    <div>Created {new Date(agent.createdAt).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteAgentId !== null} onOpenChange={() => setDeleteAgentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your agent
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAgentId && handleDeleteAgent(deleteAgentId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
