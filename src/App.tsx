import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Records from "./pages/Records";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import Pharmacy from "./pages/Pharmacy";
import Labs from "./pages/Labs";
import Family from "./pages/Family";
import Payments from "./pages/Payments";
import Hospitals from "./pages/Hospitals";
import Offline from "./pages/Offline";
import NotFound from "./pages/NotFound";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/offline" element={<Offline />} />
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/records" element={<Layout><Records /></Layout>} />
            <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
            <Route path="/pharmacy" element={<Layout><Pharmacy /></Layout>} />
            <Route path="/labs" element={<Layout><Labs /></Layout>} />
            <Route path="/family" element={<Layout><Family /></Layout>} />
            <Route path="/payments" element={<Layout><Payments /></Layout>} />
            <Route path="/hospitals" element={<Layout><Hospitals /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
