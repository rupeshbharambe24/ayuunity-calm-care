import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Shield, 
  Stethoscope, 
  Building2, 
  Pill, 
  TestTube, 
  Heart,
  Briefcase,
  GraduationCap,
  Truck,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Role = 'doctor' | 'ayush' | 'hospital' | 'pharmacy' | 'lab' | 'ngo' | 'government' | 'insurance' | 'corporate' | 'researcher' | 'ambulance';

const roles: { value: Role; label: string; desc: string; icon: any }[] = [
  { value: 'doctor', label: 'Doctor', desc: 'MBBS/Specialist', icon: Stethoscope },
  { value: 'ayush', label: 'AYUSH Practitioner', desc: 'Traditional medicine', icon: Heart },
  { value: 'hospital', label: 'Hospital/Clinic', desc: 'Healthcare facility', icon: Building2 },
  { value: 'pharmacy', label: 'Pharmacy', desc: 'Medicine dispensary', icon: Pill },
  { value: 'lab', label: 'Pathology Lab', desc: 'Diagnostic testing', icon: TestTube },
  { value: 'ngo', label: 'NGO/Health Mission', desc: 'Community health', icon: Heart },
  { value: 'government', label: 'Government/Policy', desc: 'Public health admin', icon: Shield },
  { value: 'insurance', label: 'Insurance/TPA', desc: 'Health insurance', icon: Shield },
  { value: 'corporate', label: 'Corporate Wellness', desc: 'Employee health', icon: Briefcase },
  { value: 'researcher', label: 'Researcher/Academic', desc: 'Medical research', icon: GraduationCap },
  { value: 'ambulance', label: 'Ambulance Service', desc: 'Emergency transport', icon: Truck },
];

export default function ProLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading, status } = useAuth();
  const [step, setStep] = useState<'role' | 'identifier'>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [identifier2, setIdentifier2] = useState('');
  const [identifier3, setIdentifier3] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (status === 'pending') {
        navigate('/auth/pending', { replace: true });
      } else if (status === 'rejected') {
        navigate('/auth/denied', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, status, navigate]);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep('identifier');
  };

  const handleSendOTP = async () => {
    if (!contact) {
      toast({
        title: t('auth.error'),
        description: t('auth.enterPhoneOrEmail'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const channel = contact.includes('@') ? 'email' : 'phone';
      const response = await apiClient.post<{ request_id: string }>('/auth/otp/request', {
        channel,
        value: contact,
        role: selectedRole,
        identifier: identifier,
        identifier2: identifier2,
        identifier3: identifier3,
      });
      navigate('/auth/verify-otp', { 
        state: { 
          request_id: response.request_id, 
          value: contact, 
          channel,
          role: selectedRole,
        } 
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.otpFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderIdentifierFields = () => {
    if (!selectedRole) return null;

    switch (selectedRole) {
      case 'doctor':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="board">{t('auth.registrationBoard')}</Label>
              <Input
                id="board"
                placeholder="e.g., Medical Council of India"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regno">{t('auth.registrationNumber')}</Label>
                <Input
                  id="regno"
                  placeholder="e.g., 12345"
                  value={identifier2}
                  onChange={(e) => setIdentifier2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">{t('auth.registrationYear')}</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2020"
                  value={identifier3}
                  onChange={(e) => setIdentifier3(e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 'ayush':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="council">{t('auth.council')}</Label>
              <Input
                id="council"
                placeholder="e.g., Central Council of Indian Medicine"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regno">{t('auth.registrationNumber')}</Label>
                <Input
                  id="regno"
                  placeholder="Registration ID"
                  value={identifier2}
                  onChange={(e) => setIdentifier2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system">{t('auth.system')}</Label>
                <Input
                  id="system"
                  placeholder="e.g., Ayurveda"
                  value={identifier3}
                  onChange={(e) => setIdentifier3(e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 'hospital':
        return (
          <div className="space-y-2">
            <Label htmlFor="license">{t('auth.licenseNumber')}</Label>
            <Input
              id="license"
              placeholder="Facility License or GST Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
        );
      case 'pharmacy':
        return (
          <div className="space-y-2">
            <Label htmlFor="drug-license">{t('auth.drugLicense')}</Label>
            <Input
              id="drug-license"
              placeholder="Drug License Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
        );
      case 'lab':
        return (
          <div className="space-y-2">
            <Label htmlFor="lab-license">{t('auth.labLicense')}</Label>
            <Input
              id="lab-license"
              placeholder="Lab License or NABL ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (step === 'role') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <Card className="w-full max-w-4xl shadow-lg animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80">
              <Shield className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl">{t('auth.proLoginTitle')}</CardTitle>
            <CardDescription>{t('auth.proLoginSubtitle')}</CardDescription>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>{t('auth.dataEncrypted')}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">{t('auth.selectRole')}</Label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-all hover:border-primary hover:bg-accent/5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <role.icon className="h-6 w-6 text-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button variant="ghost" onClick={() => navigate('/auth/login')} className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('auth.backToLogin')}
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">{t('auth.terms')}</button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">{t('auth.privacy')}</button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">{t('auth.security')}</button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedRoleData = roles.find(r => r.value === selectedRole);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80">
            {selectedRoleData && <selectedRoleData.icon className="h-8 w-8 text-accent-foreground" />}
          </div>
          <CardTitle className="text-2xl">
            {selectedRoleData?.label} {t('auth.signIn')}
          </CardTitle>
          <CardDescription>{t('auth.proLoginSubtitle')}</CardDescription>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>{t('auth.dataEncrypted')}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {renderIdentifierFields()}

            <div className="space-y-2">
              <Label htmlFor="contact">{t('auth.officialEmail')} / {t('auth.officialPhone')}</Label>
              <Input
                id="contact"
                type="text"
                placeholder="your@organization.com or +91 98765 43210"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSendOTP} className="w-full" disabled={loading}>
            {loading ? t('auth.sending') : t('auth.sendOtp')}
          </Button>

          <Button variant="ghost" onClick={() => setStep('role')} className="w-full gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('auth.back')}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.noAccount')} </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => navigate('/auth/signup')}
            >
              {t('auth.signUp')}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">{t('auth.terms')}</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">{t('auth.privacy')}</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">{t('auth.security')}</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
