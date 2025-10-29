import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CreateAgent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // form data state
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    category: "",
    link: "",
    shortDescription: "",
    description: "",
    tags: "",
  });

  // handle form field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle category select
  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // convert comma-separated tags into array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const newAgent = {
      model_name: formData.name,
      repo_url: formData.link,
      short_description: formData.shortDescription,
      createdBy: localStorage.getItem("username"), // you can replace this dynamically
      createdAt: new Date().toISOString(),
      is_private: false,
    };

    try {
      const response = await fetch("http://10.52.221.162:8000/api/repo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newAgent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Agent created successfully!");
      navigate("/developer/dashboard");
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("Failed to create agent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("[CreateAgent] mounted");
  }, []);

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{ backgroundColor: "#0b1120" }}
    >
      {/* Header */}
      <header
        style={{ backgroundColor: "rgba(15,23,42,0.9)" }}
        className="backdrop-blur-md border-b border-cyan-400/10 sticky top-0 z-20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/developer/dashboard")}
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
          style={{ backdropFilter: "blur(10px)" }}
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., DataSync Pro"
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Repo Link */}
              <div className="space-y-2">
                <Label htmlFor="link" className="text-slate-300">
                  GitHub / Repo Link *
                </Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter the GitHub repo link"
                  required
                  className="bg-[#0f172a]/60 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-slate-300">
                  Short Description *
                </Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief one-line description"
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
                  {isLoading ? "Creating..." : "Create Agent"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/developer/dashboard")}
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
