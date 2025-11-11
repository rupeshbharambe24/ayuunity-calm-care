import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  FileText, 
  Calendar, 
  Shield, 
  Users, 
  Activity,
  Lock,
  Globe,
  Clock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AyuUnity</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/auth/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth/signup')}>
              Sign Up Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Badge variant="secondary" className="mb-2">
            Privacy-First Healthcare Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            The unified, privacy‑first health platform for everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Connect patients, doctors, hospitals, and labs with consent-controlled data sharing, 
            secure records, and seamless appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="gap-2">
              Sign Up Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>ABDM Integrated</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>ISO 27001</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Your data is encrypted & consent‑controlled
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need for modern healthcare</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform built for patients, doctors, hospitals, labs, and pharmacies
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: 'Records Vault',
                description: 'Store all health records securely with lifetime access and granular sharing controls',
              },
              {
                icon: Calendar,
                title: 'Appointments',
                description: 'Book in-person or teleconsult appointments with verified doctors in seconds',
              },
              {
                icon: Activity,
                title: 'Lab & Reports',
                description: 'Book tests, track samples, and receive results directly in your vault',
              },
              {
                icon: Shield,
                title: 'Emergency ICE QR',
                description: 'Generate emergency QR codes with critical medical info for first responders',
              },
              {
                icon: Users,
                title: 'Family Dashboard',
                description: 'Manage health records and appointments for your entire family in one place',
              },
              {
                icon: Globe,
                title: 'Multilingual & Accessible',
                description: 'Available in English and Hindi with full accessibility support',
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">Simple steps for every stakeholder</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">For Patients</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Create account & add medical profile</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Book appointments & consult doctors</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Share records with providers securely</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Generate emergency QR codes</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Activity className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">For Doctors</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Apply & get verified by admin</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Schedule & manage appointments</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Access patient records with consent</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Issue e-prescriptions & lab orders</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-info/10">
                  <Shield className="h-6 w-6 text-info" />
                </div>
                <h3 className="font-semibold text-lg">For Hospitals & Labs</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
                    <span>Onboard & get admin approval</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
                    <span>Manage queues & orders</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
                    <span>Upload results & invoices</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
                    <span>Update resource availability</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="container py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Security & Privacy First</h2>
              <p className="text-muted-foreground">
                Your health data is yours. We've built AyuUnity with privacy and security 
                as the foundation, not an afterthought.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: Lock,
                    title: 'End-to-End Encryption',
                    description: 'Data encrypted at rest and in transit using industry-standard protocols',
                  },
                  {
                    icon: Shield,
                    title: 'Granular Consent Controls',
                    description: 'You decide exactly who can access your data and for how long',
                  },
                  {
                    icon: Clock,
                    title: 'Complete Audit Logs',
                    description: 'Track every access to your records with detailed audit trails',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Role-Based Access',
                    description: 'Healthcare providers only see what they need with your permission',
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Lock className="h-32 w-32 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Get started with AyuUnity</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of patients, doctors, and healthcare providers 
            using AyuUnity for better, more connected care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/auth/signup')} className="gap-2">
              Sign Up Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="font-bold">AyuUnity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The unified, privacy‑first health platform for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#security" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/security" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@ayuunity.health</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 1800 XXX XXXX</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AyuUnity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
