import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Pending() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80">
            <Clock className="h-8 w-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.pendingTitle')}</CardTitle>
          <CardDescription>{t('auth.pendingSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">What happens next?</p>
                <p className="text-sm text-muted-foreground">
                  Our team will review your application and supporting documents. 
                  You'll receive an email notification once the review is complete.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Review Timeline</p>
                <p className="text-sm text-muted-foreground">
                  Most applications are reviewed within 24-48 hours. 
                  Complex cases may take up to 5 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => signOut()} className="flex-1">
              Sign Out
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1">
              {t('auth.checkStatus')}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Need help? <button className="text-primary hover:underline">{t('auth.contactSupport')}</button></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
