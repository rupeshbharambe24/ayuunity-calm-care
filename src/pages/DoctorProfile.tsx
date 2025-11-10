import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Star, MapPin, Phone, Video, Mail, Award, Languages } from 'lucide-react';

export default function DoctorProfile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = {
    id: id || '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    rating: 4.8,
    reviewCount: 124,
    experience: '15 years',
    qualifications: ['MBBS', 'MD (Cardiology)', 'FACC'],
    city: 'Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    consultationTypes: ['clinic', 'video'],
    clinics: [
      { name: 'Apollo Hospital', address: 'Andheri West, Mumbai', hours: 'Mon-Sat 10AM-6PM' },
    ],
    about: 'Dr. Sharma is a highly experienced cardiologist specializing in interventional cardiology and heart disease prevention. She has published numerous papers in international journals.',
    avatar: '/placeholder.svg',
    contact: { phone: '+91 98765 43210', email: 'priya.sharma@hospital.com' },
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/doctors')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Doctors
      </Button>

      {/* Profile Header */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="h-24 w-24 flex-shrink-0">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback className="text-2xl">{doctor.name.charAt(3)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold">{doctor.name}</h1>
                  <p className="text-muted-foreground mt-1">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                  </div>
                </div>
                <Button size="lg" className="sm:w-auto w-full">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{doctor.about}</p>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.qualifications.map((qual, idx) => (
                  <Badge key={idx} variant="secondary">
                    {qual}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {doctor.experience} of experience
              </p>
            </CardContent>
          </Card>

          {/* Clinics */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Clinic Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctor.clinics.map((clinic, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">{clinic.name}</h4>
                  <p className="text-sm text-muted-foreground">{clinic.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">{clinic.hours}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Consultation Types */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {doctor.consultationTypes.includes('clinic') && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>In-Clinic</span>
                </div>
              )}
              {doctor.consultationTypes.includes('video') && (
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Video Call</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, idx) => (
                  <Badge key={idx} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="break-all">{doctor.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="break-all">{doctor.contact.email}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
