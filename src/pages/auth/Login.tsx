import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading, status } = useAuth();
  const [channel, setChannel] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
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

  const handleSendOTP = async () => {
    if (!value) {
      toast({
        title: t('auth.error'),
        description: t('auth.enterPhoneOrEmail'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post<{ request_id: string }>('/auth/otp/request', {
        channel,
        value,
      });
      navigate('/auth/verify-otp', { state: { request_id: response.request_id, value, channel } });
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.loginTitle')}</CardTitle>
          <CardDescription>{t('auth.loginSubtitle')}</CardDescription>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>{t('auth.dataEncrypted')}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={channel} onValueChange={(v) => setChannel(v as 'phone' | 'email')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">{t('auth.phone')}</TabsTrigger>
              <TabsTrigger value="email">{t('auth.email')}</TabsTrigger>
            </TabsList>
            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phoneNumber')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.emailAddress')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleSendOTP} className="w-full" disabled={loading}>
            {loading ? t('auth.sending') : t('auth.sendOtp')}
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
