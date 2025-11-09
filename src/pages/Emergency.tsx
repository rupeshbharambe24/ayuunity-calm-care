import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, QrCode, Send, User, Phone, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Emergency() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border-destructive/20 border p-4">
        <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h1 className="text-xl font-bold">{t('emergency.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quick access to critical health information for emergency situations
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emergency Contact/Nominee */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t('emergency.nominee')}
            </CardTitle>
            <CardDescription>
              Person to contact in case of emergency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-lg">John Doe</div>
                  <div className="text-sm text-muted-foreground">Spouse</div>
                </div>
                <Badge>Active</Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="text-muted-foreground">
                  Verified on Dec 1, 2024
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              {t('emergency.addNominee')}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency QR Code */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              {t('emergency.qr')}
            </CardTitle>
            <CardDescription>
              Scan to access emergency health information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center rounded-lg border bg-muted/30 p-8">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-background border-2">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                {t('emergency.downloadQr')}
              </Button>
              <Button variant="outline" className="flex-1">
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Packet */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Emergency Health Packet</CardTitle>
          <CardDescription>
            Critical medical information for emergency responders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {t('emergency.bloodGroup')}
              </div>
              <div className="text-2xl font-bold text-destructive">A+</div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {t('emergency.allergies')}
              </div>
              <div className="text-sm">Penicillin, Peanuts</div>
            </div>

            <div className="rounded-lg border p-4 sm:col-span-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t('emergency.medications')}
              </div>
              <div className="space-y-1 text-sm">
                <div>• Aspirin 81mg - Daily (Heart health)</div>
                <div>• Lisinopril 10mg - Daily (Blood pressure)</div>
                <div>• Metformin 500mg - Twice daily (Diabetes)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Send Emergency Packet</div>
            <div className="flex gap-2">
              <Button variant="destructive" className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Send to Hospital
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Send to Doctor
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Sends your critical health information securely
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
