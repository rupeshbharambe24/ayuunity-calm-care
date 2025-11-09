import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Video, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Appointments() {
  const { t } = useTranslation();

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      date: 'Tomorrow',
      time: '10:00 AM',
      mode: 'teleconsult',
      status: 'scheduled',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Dec 25',
      time: '2:30 PM',
      mode: 'in-person',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('appointments.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Manage your healthcare appointments
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          {t('appointments.book')}
        </Button>
      </div>

      {/* Search Doctors */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Find a Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('appointments.search')}
                className="pl-9"
              />
            </div>
            <Button variant="outline">{t('appointments.specialty')}</Button>
            <Button variant="outline">{t('appointments.location')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{t('appointments.upcoming')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src="" alt={apt.doctor} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {apt.doctor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="font-medium">{apt.doctor}</div>
                  <div className="text-sm text-muted-foreground">
                    {apt.specialty}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{apt.date} at {apt.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={apt.mode === 'teleconsult' ? 'default' : 'outline'}>
                    {apt.mode === 'teleconsult' ? (
                      <>
                        <Video className="mr-1 h-3 w-3" />
                        Teleconsult
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-1 h-3 w-3" />
                        In Person
                      </>
                    )}
                  </Badge>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('appointments.reschedule')}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t('appointments.cancel')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Doctors */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Top Rated Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Dr. Emily Rodriguez', specialty: 'Dermatologist', rating: 4.9, patients: 1200 },
              { name: 'Dr. James Wilson', specialty: 'Orthopedic', rating: 4.8, patients: 980 },
              { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', rating: 4.9, patients: 1500 },
            ].map((doctor, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{doctor.name}</div>
                    <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{doctor.patients} patients</span>
                </div>

                <Button size="sm" className="w-full">
                  Book Appointment
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
