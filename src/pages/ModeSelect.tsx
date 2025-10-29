import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Code } from 'lucide-react';

const ModeSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 text-slate-100">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Mode</h1>
          <p className="text-xl text-slate-300">
            Select how you'd like to use AgentSphere
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* USER MODE */}
          <Card className="cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-slate-800 bg-slate-800/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_40px_-15px_rgba(56,189,248,0.45)]">
                <User className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-cyan-300">User Mode</CardTitle>
              <CardDescription className="text-base text-slate-300">
                Discover and activate agents to enhance your workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-slate-300">
                <li>• Browse available agents</li>
                <li>• View detailed descriptions</li>
                <li>• Activate agents instantly</li>
                <li>• Track your active agents</li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-[0_15px_50px_-20px_rgba(56,189,248,0.35)] transition-all"
                onClick={() => navigate('/user/dashboard')}
              >
                Enter User Mode
              </Button>
            </CardContent>
          </Card>

          {/* DEVELOPER MODE */}
          <Card className="cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-slate-800 bg-slate-800/60 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_10px_40px_-15px_rgba(99,102,241,0.40)]">
                <Code className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-indigo-300">Developer Mode</CardTitle>
              <CardDescription className="text-base text-slate-300">
                Create and manage your own intelligent agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-slate-300">
                <li>• Create new agents</li>
                <li>• Edit agent configurations</li>
                <li>• Monitor usage analytics</li>
                <li>• Manage your agent portfolio</li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:shadow-[0_15px_50px_-20px_rgba(99,102,241,0.35)] transition-all"
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
