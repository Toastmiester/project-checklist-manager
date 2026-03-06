import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EHSProvider } from "@/context/EHSContext";
import ProjectSetup from "./pages/ProjectSetup";
import PhaseChecklist from "./pages/PhaseChecklist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EHSProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectSetup />} />
            <Route path="/checklist/:phaseIndex" element={<PhaseChecklist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EHSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
