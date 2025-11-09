import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Share2, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your health overview.
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{t('dashboard.quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">{t('dashboard.addRecord')}</div>
                <div className="text-xs text-muted-foreground">Upload a new health record</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <Calendar className="h-5 w-5 text-accent" />
              <div className="text-left">
                <div className="font-medium">{t('dashboard.bookAppointment')}</div>
                <div className="text-xs text-muted-foreground">Schedule with a doctor</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start gap-2 h-auto py-4">
              <Share2 className="h-5 w-5 text-info" />
              <div className="text-left">
                <div className="font-medium">{t('dashboard.shareRecords')}</div>
                <div className="text-xs text-muted-foreground">Share with healthcare providers</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Upcoming & Recent */}
        <div className="space-y-6 lg:col-span-2">
          {/* Upcoming Appointments */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {t('dashboard.upcoming')}
              </CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Dr. Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      General Physician • Tomorrow at 10:00 AM
                    </div>
                  </div>
                  <Badge>Teleconsult</Badge>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Dr. Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Cardiologist • Dec 25 at 2:30 PM
                    </div>
                  </div>
                  <Badge variant="outline">In Person</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Records */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t('dashboard.recentRecords')}
              </CardTitle>
              <CardDescription>Recently uploaded health documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Blood Test Results', type: 'Lab Report', date: '2 days ago' },
                  { title: 'Chest X-Ray', type: 'Imaging', date: '1 week ago' },
                  { title: 'Prescription - Dr. Smith', type: 'Prescription', date: '2 weeks ago' },
                ].map((record, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{record.title}</div>
                      <div className="text-sm text-muted-foreground">{record.type}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{record.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Health Cards & Emergency */}
        <div className="space-y-6">
          {/* Health Summary */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('dashboard.healthCards')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3 bg-success/5">
                <div className="text-sm font-medium">Vaccinations Up to Date</div>
                <div className="text-xs text-muted-foreground mt-1">All required vaccines completed</div>
              </div>
              
              <div className="rounded-lg border p-3 bg-warning/5">
                <div className="text-sm font-medium">Annual Checkup Due</div>
                <div className="text-xs text-muted-foreground mt-1">Schedule your yearly physical</div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Info */}
          <Card className="shadow-md border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                {t('dashboard.emergency')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-sm font-medium">Emergency Contact</div>
                <div className="text-xs text-muted-foreground mt-1">John Doe (Spouse)</div>
                <div className="text-xs text-muted-foreground">+91 98765 43210</div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" className="flex-1">
                  View QR Code
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
