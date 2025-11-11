import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Lock } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function VerifyOTP() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { request_id, value, channel } = location.state || {};

  useEffect(() => {
    if (!request_id) {
      navigate('/auth/login');
    }
  }, [request_id, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast({
        title: t('auth.error'),
        description: t('auth.enterCompleteOtp'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post<{ token?: string; user: any; roles: string[]; status: string }>('/auth/otp/verify', {
        request_id,
        otp: otpCode,
      });

      if (response.token) {
        apiClient.setToken(response.token);
      }

      setUser(response.user);

      if (response.status === 'pending') {
        navigate('/auth/pending', { replace: true });
      } else if (response.status === 'rejected') {
        navigate('/auth/denied', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.invalidOtp'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(60);
    try {
      await apiClient.post('/auth/otp/request', { channel, value });
      toast({
        title: t('auth.success'),
        description: t('auth.otpResent'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.verifyOtp')}</CardTitle>
          <CardDescription>
            {t('auth.otpSentTo')} <strong>{value}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button onClick={handleVerify} className="w-full" disabled={loading}>
            {loading ? t('auth.verifying') : t('auth.verify')}
          </Button>

          <div className="text-center text-sm space-y-2">
            {resendTimer > 0 ? (
              <p className="text-muted-foreground">
                {t('auth.resendIn')} {resendTimer}s
              </p>
            ) : (
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={handleResend}
              >
                {t('auth.resendOtp')}
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => navigate('/auth/login')}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.backToLogin')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
