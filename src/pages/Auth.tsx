import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Step = 'auth' | 'profile' | 'consent';

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('auth');
  const [channel, setChannel] = useState<'phone' | 'email'>('phone');

  const renderAuth = () => (
    <div className="space-y-6">
      <RadioGroup value={channel} onValueChange={(v) => setChannel(v as 'phone' | 'email')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="phone" id="phone" />
          <Label htmlFor="phone">{t('auth.phone')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email" />
          <Label htmlFor="email">{t('auth.email')}</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="contact">
          {channel === 'phone' ? t('auth.phone') : t('auth.email')}
        </Label>
        <Input
          id="contact"
          type={channel === 'phone' ? 'tel' : 'email'}
          placeholder={channel === 'phone' ? '+91 98765 43210' : 'your@email.com'}
        />
      </div>

      <Button onClick={() => setStep('profile')} className="w-full">
        {t('auth.sendOtp')}
      </Button>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t('profile.name')}</Label>
        <Input id="name" placeholder="John Doe" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dob">{t('profile.dob')}</Label>
          <Input id="dob" type="date" />
        </div>

        <div className="space-y-2">
          <Label>{t('profile.gender')}</Label>
          <RadioGroup defaultValue="male">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{t('profile.male')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{t('profile.female')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">{t('profile.other')}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroup">{t('profile.bloodGroup')}</Label>
        <Input id="bloodGroup" placeholder="A+" />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('auth')} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('auth.back')}
        </Button>
        <Button onClick={() => setStep('consent')} className="flex-1">
          {t('auth.next')}
        </Button>
      </div>
    </div>
  );

  const renderConsent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox id="tos" />
          <Label htmlFor="tos" className="text-sm leading-relaxed cursor-pointer">
            {t('consent.tos')}
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="privacy" />
          <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
            {t('consent.privacy')}
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="dataSharing" />
          <Label htmlFor="dataSharing" className="text-sm leading-relaxed cursor-pointer">
            {t('consent.dataSharing')}
          </Label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('profile')} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('auth.back')}
        </Button>
        <Button onClick={() => navigate('/')} className="flex-1">
          {t('consent.complete')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover">
            <span className="text-3xl font-bold text-primary-foreground">A</span>
          </div>
          <CardTitle className="text-2xl">{t('auth.title')}</CardTitle>
          <CardDescription>{t('auth.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'auth' && renderAuth()}
          {step === 'profile' && renderProfile()}
          {step === 'consent' && renderConsent()}
        </CardContent>
      </Card>
    </div>
  );
}
