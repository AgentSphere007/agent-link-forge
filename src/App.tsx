// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ModeSelect from "./pages/ModeSelect";
import UserDashboard from "./pages/UserDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import CreateAgent from "./pages/CreateAgent";
import EditAgent from "./pages/EditAgent";
import InstalledAgents from "./pages/InstalledAgents"; // <-- ✅ NEWLY ADDED PAGE
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={150}>
      {/* Global Toasters */}
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* ---------- Shared Routes ---------- */}
          <Route path="/mode-select" element={<ModeSelect />} />

          {/* ---------- User Routes ---------- */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/installed-agents" element={<InstalledAgents />} />

          {/* ---------- Developer Routes ---------- */}
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          <Route path="/developer/create" element={<CreateAgent />} />
          <Route path="/developer/edit/:agentId" element={<EditAgent />} />

          {/* ---------- Catch-all Route ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
