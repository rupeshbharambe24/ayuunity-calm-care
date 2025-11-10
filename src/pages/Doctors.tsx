import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Star, MapPin, Phone, Video } from 'lucide-react';

export default function Doctors() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviewCount: 124,
      city: 'Mumbai',
      languages: ['English', 'Hindi', 'Marathi'],
      consultationTypes: ['clinic', 'video'],
      avatar: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviewCount: 198,
      city: 'Delhi',
      languages: ['English', 'Hindi'],
      consultationTypes: ['clinic', 'video'],
      avatar: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Dr. Anita Patel',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviewCount: 87,
      city: 'Bangalore',
      languages: ['English', 'Hindi', 'Kannada'],
      consultationTypes: ['clinic'],
      avatar: '/placeholder.svg',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.doctors')}</h1>
        <p className="text-muted-foreground mt-1">
          Find and book appointments with qualified doctors
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2 sm:w-auto">
              <Filter className="h-4 w-4" />
              {t('common.filter')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate(`/doctors/${doctor.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(3)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate" title={doctor.name}>
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({doctor.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{doctor.city}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {doctor.consultationTypes.includes('clinic') && (
                    <Badge variant="secondary" className="gap-1">
                      <Phone className="h-3 w-3" />
                      Clinic
                    </Badge>
                  )}
                  {doctor.consultationTypes.includes('video') && (
                    <Badge variant="secondary" className="gap-1">
                      <Video className="h-3 w-3" />
                      Video
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                  {doctor.languages.join(', ')}
                </div>
              </div>

              <Button className="w-full mt-4" onClick={(e) => {
                e.stopPropagation();
                navigate(`/doctors/${doctor.id}`);
              }}>
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <Card className="shadow-md">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
