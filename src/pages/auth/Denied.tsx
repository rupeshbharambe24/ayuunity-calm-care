import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Denied() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-destructive to-destructive/80">
            <XCircle className="h-8 w-8 text-destructive-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.deniedTitle')}</CardTitle>
          <CardDescription>{t('auth.deniedSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/50 space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Reason for Rejection</p>
                <p className="text-sm text-muted-foreground">
                  Your application was not approved due to incomplete or unverifiable information.
                  Please check your email for specific details.
                </p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Common reasons:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Invalid or expired registration documents</li>
                <li>Unverifiable credentials</li>
                <li>Incomplete application information</li>
                <li>Mismatch in provided details</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => signOut()} className="flex-1">
              Sign Out
            </Button>
            <Button onClick={() => navigate('/auth/signup')} className="flex-1">
              Reapply
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Questions? <button className="text-primary hover:underline">{t('auth.contactSupport')}</button></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
