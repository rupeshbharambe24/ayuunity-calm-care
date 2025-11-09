import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, MapPin, Phone, Clock, Bed, Activity } from 'lucide-react';

export default function Hospitals() {
  const { t } = useTranslation();
  const [isAdmin] = useState(false); // Role check would come from auth context

  const hospitals = [
    {
      id: '1',
      name: 'Apollo Hospital',
      specialty: 'Multi-specialty',
      city: 'Mumbai',
      address: 'Andheri West, Mumbai - 400053',
      phone: '+91 22 1234 5678',
      hours: '24/7 Emergency',
      resources: {
        bedTotal: 500,
        bedAvailable: 45,
        icuTotal: 50,
        icuAvailable: 8,
        oxygenPoints: 100,
      },
      lastUpdated: '2024-01-18 14:30',
    },
    {
      id: '2',
      name: 'Fortis Hospital',
      specialty: 'Cardiac Care',
      city: 'Mumbai',
      address: 'Mulund West, Mumbai - 400080',
      phone: '+91 22 9876 5432',
      hours: '24/7 Emergency',
      resources: {
        bedTotal: 350,
        bedAvailable: 32,
        icuTotal: 40,
        icuAvailable: 5,
        oxygenPoints: 80,
      },
      lastUpdated: '2024-01-18 10:15',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hospital Directory</h1>
        <p className="text-muted-foreground mt-1">
          Find hospitals and check real-time resource availability
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hospitals..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">City</Button>
            <Button variant="outline">Specialty</Button>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{hospital.name}</CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <Badge variant="outline">{hospital.specialty}</Badge>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {hospital.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.hours}</span>
                </div>
              </div>

              {/* Resource Board */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Resource Availability</div>
                  <div className="text-xs text-muted-foreground">
                    Last updated: {hospital.lastUpdated}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Beds */}
                  <div className="rounded-lg bg-background p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bed className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">General Beds</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {hospital.resources.bedAvailable}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {hospital.resources.bedTotal}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">available</div>
                  </div>

                  {/* ICU */}
                  <div className="rounded-lg bg-background p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">ICU Beds</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-destructive">
                        {hospital.resources.icuAvailable}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {hospital.resources.icuTotal}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">available</div>
                  </div>

                  {/* Oxygen */}
                  <div className="rounded-lg bg-background p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-info" />
                      <span className="text-sm font-medium">Oxygen Points</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-info">
                        {hospital.resources.oxygenPoints}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">active</div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      Update Resources
                    </Button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" className="flex-1">
                  Get Directions
                </Button>
                <Button className="flex-1">
                  Contact Hospital
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
