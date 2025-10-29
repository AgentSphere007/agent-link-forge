import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Code } from 'lucide-react';

const ModeSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Mode</h1>
          <p className="text-xl text-muted-foreground">
            Select how you'd like to use AgentSphere
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl">User Mode</CardTitle>
              <CardDescription className="text-base">
                Discover and activate agents to enhance your workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Browse available agents</li>
                <li>• View detailed descriptions</li>
                <li>• Activate agents instantly</li>
                <li>• Track your active agents</li>
              </ul>
              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => navigate('/user/dashboard')}
              >
                Enter User Mode
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl">Developer Mode</CardTitle>
              <CardDescription className="text-base">
                Create and manage your own intelligent agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Create new agents</li>
                <li>• Edit agent configurations</li>
                <li>• Monitor usage analytics</li>
                <li>• Manage your agent portfolio</li>
              </ul>
              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => navigate('/developer/dashboard')}
              >
                Enter Developer Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
