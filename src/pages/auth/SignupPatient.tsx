import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Plus, X } from 'lucide-react';
import { PatientAccountSchema, PatientMedicalProfileSchema } from '@/lib/validation';
import type { PatientAccount, PatientMedicalProfile, ICEContact, Medication, Surgery } from '@/lib/validation';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

type Step = 'account' | 'medical' | 'consent';

const chronicConditions = [
  'diabetes', 'hypertension', 'asthma', 'ckd', 'cad', 
  'thyroid', 'epilepsy', 'copd', 'cancer_history', 'mental_health', 'other'
];

export default function SignupPatient() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('account');
  const [loading, setLoading] = useState(false);

  const [accountData, setAccountData] = useState<PatientAccount | null>(null);
  const [medicalData, setMedicalData] = useState<Partial<PatientMedicalProfile>>({
    allergies: [],
    chronic_conditions: [],
    medications: [],
    surgeries: [],
    ice_contacts: [{ name: '', relation: '', phone: '' }],
  });

  const [consents, setConsents] = useState({
    tos: false,
    privacy: false,
    dataSharing: false,
    marketing: false,
  });

  const handleAccountSubmit = (data: PatientAccount) => {
    setAccountData(data);
    setStep('medical');
  };

  const handleMedicalSubmit = () => {
    setStep('consent');
  };

  const handleFinalSubmit = async () => {
    if (!consents.tos || !consents.privacy) {
      toast({
        title: t('auth.error'),
        description: t('auth.acceptRequired'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post<{ user_id: string; user: any; token?: string }>('/auth/signup/patient', {
        account: accountData,
        profile: medicalData,
        consents,
      });

      if (response.token) {
        apiClient.setToken(response.token);
      }
      setUser(response.user);
      navigate('/', { replace: true });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.signupFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-2xl shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.patientSignup')}</CardTitle>
          <CardDescription>
            {step === 'account' && t('auth.stepAccount')}
            {step === 'medical' && t('auth.stepMedical')}
            {step === 'consent' && t('auth.stepConsent')}
          </CardDescription>
          <div className="flex justify-center gap-2">
            <div className={`h-2 w-16 rounded-full ${step === 'account' ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-16 rounded-full ${step === 'medical' ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-16 rounded-full ${step === 'consent' ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </CardHeader>
        <CardContent>
          {step === 'account' && <AccountForm onSubmit={handleAccountSubmit} />}
          {step === 'medical' && (
            <MedicalForm 
              data={medicalData} 
              onChange={setMedicalData}
              onSubmit={handleMedicalSubmit}
              onBack={() => setStep('account')}
            />
          )}
          {step === 'consent' && (
            <ConsentForm
              consents={consents}
              onChange={setConsents}
              onSubmit={handleFinalSubmit}
              onBack={() => setStep('medical')}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AccountForm({ onSubmit }: { onSubmit: (data: PatientAccount) => void }) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<PatientAccount>({
    resolver: zodResolver(PatientAccountSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('profile.name')}*</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dob">{t('profile.dob')}*</Label>
          <Input id="dob" type="date" {...register('dob')} />
          {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sex_at_birth">{t('profile.sexAtBirth')}*</Label>
          <select id="sex_at_birth" {...register('sex_at_birth')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="male">{t('profile.male')}</option>
            <option value="female">{t('profile.female')}</option>
            <option value="intersex">{t('profile.intersex')}</option>
            <option value="prefer_not_to_say">{t('profile.preferNotToSay')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">{t('auth.phone')}</Label>
          <Input id="phone" type="tel" {...register('phone')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.line1">{t('profile.addressLine1')}*</Label>
        <Input id="address.line1" {...register('address.line1')} />
        {errors.address?.line1 && <p className="text-sm text-destructive">{errors.address.line1.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address.city">{t('profile.city')}*</Label>
          <Input id="address.city" {...register('address.city')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address.state">{t('profile.state')}*</Label>
          <Input id="address.state" {...register('address.state')} />
        </div>
      </div>

      <Button type="submit" className="w-full">{t('auth.next')}</Button>
    </form>
  );
}

function MedicalForm({ data, onChange, onSubmit, onBack }: {
  data: Partial<PatientMedicalProfile>;
  onChange: (data: Partial<PatientMedicalProfile>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const { t } = useTranslation();

  const addICEContact = () => {
    if ((data.ice_contacts?.length || 0) < 2) {
      onChange({
        ...data,
        ice_contacts: [...(data.ice_contacts || []), { name: '', relation: '', phone: '' }],
      });
    }
  };

  const updateICEContact = (index: number, field: keyof ICEContact, value: string) => {
    const updated = [...(data.ice_contacts || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, ice_contacts: updated });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{t('auth.medicalProfileIntro')}</p>

      <div className="space-y-2">
        <Label>{t('profile.bloodGroup')}</Label>
        <select
          value={data.blood_group || ''}
          onChange={(e) => onChange({ ...data, blood_group: e.target.value as any })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">{t('profile.selectBloodGroup')}</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>{t('profile.chronicConditions')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {chronicConditions.map(condition => (
            <label key={condition} className="flex items-center space-x-2">
              <Checkbox
                checked={data.chronic_conditions?.includes(condition)}
                onCheckedChange={(checked) => {
                  const updated = checked
                    ? [...(data.chronic_conditions || []), condition]
                    : (data.chronic_conditions || []).filter(c => c !== condition);
                  onChange({ ...data, chronic_conditions: updated });
                }}
              />
              <span className="text-sm">{t(`profile.conditions.${condition}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('profile.iceContacts')}*</Label>
        {data.ice_contacts?.map((contact, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded-lg">
            <Input
              placeholder={t('profile.name')}
              value={contact.name}
              onChange={(e) => updateICEContact(index, 'name', e.target.value)}
            />
            <Input
              placeholder={t('profile.relation')}
              value={contact.relation}
              onChange={(e) => updateICEContact(index, 'relation', e.target.value)}
            />
            <Input
              placeholder={t('auth.phone')}
              value={contact.phone}
              onChange={(e) => updateICEContact(index, 'phone', e.target.value)}
            />
          </div>
        ))}
        {(data.ice_contacts?.length || 0) < 2 && (
          <Button type="button" variant="outline" size="sm" onClick={addICEContact}>
            <Plus className="h-4 w-4 mr-2" />
            {t('profile.addContact')}
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('auth.back')}
        </Button>
        <Button type="button" onClick={onSubmit} className="flex-1">
          {t('auth.next')}
        </Button>
      </div>
    </div>
  );
}

function ConsentForm({ consents, onChange, onSubmit, onBack, loading }: {
  consents: any;
  onChange: (consents: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <Checkbox
            checked={consents.tos}
            onCheckedChange={(checked) => onChange({ ...consents, tos: checked })}
          />
          <span className="text-sm leading-relaxed">{t('consent.tos')}*</span>
        </label>

        <label className="flex items-start space-x-3">
          <Checkbox
            checked={consents.privacy}
            onCheckedChange={(checked) => onChange({ ...consents, privacy: checked })}
          />
          <span className="text-sm leading-relaxed">{t('consent.privacy')}*</span>
        </label>

        <label className="flex items-start space-x-3">
          <Checkbox
            checked={consents.dataSharing}
            onCheckedChange={(checked) => onChange({ ...consents, dataSharing: checked })}
          />
          <span className="text-sm leading-relaxed">{t('consent.dataSharing')}</span>
        </label>

        <label className="flex items-start space-x-3">
          <Checkbox
            checked={consents.marketing}
            onCheckedChange={(checked) => onChange({ ...consents, marketing: checked })}
          />
          <span className="text-sm leading-relaxed">{t('consent.marketing')}</span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('auth.back')}
        </Button>
        <Button type="button" onClick={onSubmit} className="flex-1" disabled={loading}>
          {loading ? t('auth.submitting') : t('consent.complete')}
        </Button>
      </div>
    </div>
  );
}
