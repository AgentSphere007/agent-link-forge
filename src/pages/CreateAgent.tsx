import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const CreateAgent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('[CreateAgent] mounted');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate agent creation
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Agent created successfully!');
      navigate('/developer/dashboard');
    }, 1500);
  };

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{ backgroundColor: '#0b1120' }}
    >
      {/* Header */}
      <header
        style={{ backgroundColor: 'rgba(15,23,42,0.9)' }}
        className="backdrop-blur-md border-b border-cyan-400/10 sticky top-0 z-20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/developer/dashboard')}
              className="bg-[#111524]/60 text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-cyan-300">
              Create New Agent
            </h1>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card
          className="bg-[#111524]/80 border border-cyan-400/10 shadow-[0_20px_60px_-30px_rgba(34,211,238,0.12)] text-slate-200"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <CardHeader>
            <CardTitle className="text-cyan-300">Agent Details</CardTitle>
            <CardDescription className="text-slate-400">
              Fill in the information below to create your agent
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agent Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Agent Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., DataSync Pro"
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Icon */}
              <div className="space-y-2">
                <Label htmlFor="icon" className="text-slate-300">
                  Icon (Emoji) *
                </Label>
                <Input
                  id="icon"
                  placeholder="🤖"
                  maxLength={2}
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">
                  Category *
                </Label>
                <Select required>
                  <SelectTrigger className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 focus:border-cyan-400 focus:ring-0">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111524] text-slate-100 border border-slate-700">
                    <SelectItem value="data">Data Management</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-slate-300">
                  Short Description *
                </Label>
                <Input
                  id="shortDescription"
                  placeholder="Brief one-line description"
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Full Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of your agent's capabilities..."
                  rows={6}
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-slate-300">
                  Tags (comma-separated) *
                </Label>
                <Input
                  id="tags"
                  placeholder="AI, Automation, API"
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="gradient"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Agent'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/developer/dashboard')}
                  className="flex-1 border border-gray-400 text-foreground hover:bg-muted hover:text-foreground"
                >
                  Cancel
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAgent;
