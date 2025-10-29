// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ModeSelect from "./pages/ModeSelect";
import UserDashboard from "./pages/UserDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import CreateAgent from "./pages/CreateAgent";
import EditAgent from "./pages/EditAgent";
import InstalledAgents from "./pages/InstalledAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // ✅ true if token exists, false otherwise
  }, []);

  // Optional: You can show a short loading state before redirect
  if (isAuthenticated === null) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>
        {/* Global Toasters */}
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* ---------- Public Routes ---------- */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/mode-select" replace />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/mode-select" replace />
                ) : (
                  <Auth />
                )
              }
            />

            {/* ---------- Shared Routes ---------- */}
            <Route
              path="/mode-select"
              element={
                isAuthenticated ? <ModeSelect /> : <Navigate to="/" replace />
              }
            />

            {/* ---------- User Routes ---------- */}
            <Route
              path="/user/dashboard"
              element={
                isAuthenticated ? (
                  <UserDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/installed-agents"
              element={
                isAuthenticated ? (
                  <InstalledAgents />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* ---------- Developer Routes ---------- */}
            <Route
              path="/developer/dashboard"
              element={
                isAuthenticated ? (
                  <DeveloperDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/developer/create"
              element={
                isAuthenticated ? <CreateAgent /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/developer/edit/:agentId"
              element={
                isAuthenticated ? <EditAgent /> : <Navigate to="/" replace />
              }
            />

            {/* ---------- Catch-all Route ---------- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
