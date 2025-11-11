import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, Stethoscope, Building2, Pill, FlaskConical, 
  Heart, Landmark, Shield, Briefcase, GraduationCap, Ambulance, Lock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const roles = [
  { id: 'patient', icon: User, label: 'auth.roles.patient', desc: 'auth.roles.patientDesc', auto: true },
  { id: 'doctor', icon: Stethoscope, label: 'auth.roles.doctor', desc: 'auth.roles.doctorDesc' },
  { id: 'ayush', icon: Heart, label: 'auth.roles.ayush', desc: 'auth.roles.ayushDesc' },
  { id: 'hospital', icon: Building2, label: 'auth.roles.hospital', desc: 'auth.roles.hospitalDesc' },
  { id: 'pharmacy', icon: Pill, label: 'auth.roles.pharmacy', desc: 'auth.roles.pharmacyDesc' },
  { id: 'lab', icon: FlaskConical, label: 'auth.roles.lab', desc: 'auth.roles.labDesc' },
  { id: 'ngo', icon: Heart, label: 'auth.roles.ngo', desc: 'auth.roles.ngoDesc' },
  { id: 'government', icon: Landmark, label: 'auth.roles.government', desc: 'auth.roles.governmentDesc' },
  { id: 'insurance', icon: Shield, label: 'auth.roles.insurance', desc: 'auth.roles.insuranceDesc' },
  { id: 'corporate', icon: Briefcase, label: 'auth.roles.corporate', desc: 'auth.roles.corporateDesc' },
  { id: 'researcher', icon: GraduationCap, label: 'auth.roles.researcher', desc: 'auth.roles.researcherDesc' },
  { id: 'ambulance', icon: Ambulance, label: 'auth.roles.ambulance', desc: 'auth.roles.ambulanceDesc' },
];

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleRoleSelect = (roleId: string) => {
    if (roleId === 'patient') {
      navigate('/auth/signup/patient');
    } else {
      navigate(`/auth/signup/${roleId}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-4xl shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.signupTitle')}</CardTitle>
          <CardDescription>{t('auth.signupSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="relative flex flex-col items-start p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all text-left group"
                >
                  {role.auto && (
                    <span className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {t('auth.autoApproved')}
                    </span>
                  )}
                  <Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm mb-1">{t(role.label)}</h3>
                  <p className="text-xs text-muted-foreground">{t(role.desc)}</p>
                </button>
              );
            })}
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.haveAccount')} </span>
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => navigate('/auth/login')}
            >
              {t('auth.signIn')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
