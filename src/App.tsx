import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { DemoBanner } from "./components/DemoBanner";
import { apiClient } from "./lib/api";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import ProLogin from "./pages/auth/ProLogin";
import Signup from "./pages/auth/Signup";
import SignupPatient from "./pages/auth/SignupPatient";
import SignupDoctor from "./pages/auth/SignupDoctor";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Pending from "./pages/auth/Pending";
import Denied from "./pages/auth/Denied";
import Records from "./pages/Records";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Notifications from "./pages/Notifications";
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
        {apiClient.isMockMode() && <DemoBanner />}
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/pro-login" element={<ProLogin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/signup/patient" element={<SignupPatient />} />
              <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/pending" element={<Pending />} />
        <Route path="/auth/denied" element={<Denied />} />
        <Route path="/auth/signup/doctor" element={<SignupDoctor />} />
              <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
              <Route path="/offline" element={<Offline />} />
              <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/records" element={<ProtectedRoute><Layout><Records /></Layout></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><Layout><Appointments /></Layout></ProtectedRoute>} />
              <Route path="/doctors" element={<ProtectedRoute><Layout><Doctors /></Layout></ProtectedRoute>} />
              <Route path="/doctors/:id" element={<ProtectedRoute><Layout><DoctorProfile /></Layout></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />
              <Route path="/emergency" element={<ProtectedRoute><Layout><Emergency /></Layout></ProtectedRoute>} />
              <Route path="/pharmacy" element={<ProtectedRoute><Layout><Pharmacy /></Layout></ProtectedRoute>} />
              <Route path="/labs" element={<ProtectedRoute><Layout><Labs /></Layout></ProtectedRoute>} />
              <Route path="/family" element={<ProtectedRoute><Layout><Family /></Layout></ProtectedRoute>} />
              <Route path="/payments" element={<ProtectedRoute><Layout><Payments /></Layout></ProtectedRoute>} />
              <Route path="/hospitals" element={<ProtectedRoute><Layout><Hospitals /></Layout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
