import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Search, Home, Building, Calendar, Download, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Labs() {
  const { t } = useTranslation();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const testCatalog = [
    {
      id: '1',
      name: 'Complete Blood Count (CBC)',
      price: 350,
      fasting: false,
      tags: ['Basic', 'Common'],
      description: 'Measures different components of blood',
    },
    {
      id: '2',
      name: 'Lipid Profile',
      price: 600,
      fasting: true,
      tags: ['Heart Health', 'Common'],
      description: 'Cholesterol and triglycerides levels',
    },
    {
      id: '3',
      name: 'Thyroid Function Test (TFT)',
      price: 550,
      fasting: false,
      tags: ['Hormonal', 'Common'],
      description: 'T3, T4, and TSH levels',
    },
    {
      id: '4',
      name: 'HbA1c (Diabetes)',
      price: 450,
      fasting: false,
      tags: ['Diabetes', 'Common'],
      description: 'Average blood sugar over 3 months',
    },
  ];

  const bookings = [
    {
      id: '1',
      tests: ['CBC', 'Lipid Profile'],
      status: 'ready',
      booked: '2024-01-10',
      collected: '2024-01-12',
      homeCollection: true,
      price: 950,
    },
    {
      id: '2',
      tests: ['Thyroid Function Test'],
      status: 'processing',
      booked: '2024-01-15',
      collected: '2024-01-16',
      homeCollection: false,
      price: 550,
    },
    {
      id: '3',
      tests: ['HbA1c'],
      status: 'scheduled',
      booked: '2024-01-18',
      scheduled: '2024-01-20 08:00 AM',
      homeCollection: true,
      price: 450,
    },
  ];

  const statusColors = {
    scheduled: 'bg-info/10 text-info',
    'sample-collected': 'bg-warning/10 text-warning',
    processing: 'bg-warning/10 text-warning',
    ready: 'bg-success/10 text-success',
  };

  const handleTestToggle = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const selectedTestsData = testCatalog.filter((t) => selectedTests.includes(t.id));
  const totalPrice = selectedTestsData.reduce((sum, t) => sum + t.price, 0);
  const requiresFasting = selectedTestsData.some((t) => t.fasting);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('nav.labs')}</h1>
          <p className="text-muted-foreground mt-1">
            Book lab tests and view results
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FlaskConical className="h-4 w-4" />
              Book Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book Lab Tests</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Test Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Select Tests</Label>
                  <div className="text-sm text-muted-foreground">
                    {selectedTests.length} selected
                  </div>
                </div>

                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search tests..." className="pl-9" />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {testCatalog.map((test) => (
                    <div
                      key={test.id}
                      className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={test.id}
                          checked={selectedTests.includes(test.id)}
                          onCheckedChange={() => handleTestToggle(test.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={test.id} className="cursor-pointer">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">{test.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {test.description}
                                </div>
                                <div className="flex gap-2 mt-2">
                                  {test.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {test.fasting && (
                                    <Badge variant="outline" className="text-xs bg-warning/10">
                                      Fasting Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="font-semibold text-primary">₹{test.price}</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTests.length > 0 && (
                <>
                  {/* Collection Method */}
                  <div className="space-y-3">
                    <Label>Collection Method</Label>
                    <RadioGroup defaultValue="home">
                      <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="home" id="home" />
                          <Label htmlFor="home" className="cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-primary" />
                              <span className="font-medium">Home Collection</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Sample collected at your home
                            </div>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="walkin" id="walkin" />
                          <Label htmlFor="walkin" className="cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-primary" />
                              <span className="font-medium">Walk-in</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Visit lab center
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Slot Selection (simplified) */}
                  <div className="space-y-3">
                    <Label>Select Date & Time</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Input type="time" />
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  {requiresFasting && (
                    <div className="rounded-lg bg-warning/10 border border-warning/20 p-4">
                      <div className="flex gap-3">
                        <Calendar className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Fasting Required</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Please fast for 8-12 hours before sample collection. Water is allowed.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Total Amount</div>
                      <div className="text-2xl font-bold text-primary">₹{totalPrice}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedTests.length} test{selectedTests.length > 1 ? 's' : ''} selected
                    </div>
                  </div>

                  <Button className="w-full">Confirm Booking</Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Bookings */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings
              .filter((b) => b.status === 'scheduled' || b.status === 'processing')
              .map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium">{booking.tests.join(', ')}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {booking.homeCollection ? (
                          <span className="flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            Home Collection
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            Walk-in
                          </span>
                        )}
                      </div>
                      {booking.scheduled && (
                        <div className="text-sm text-muted-foreground">
                          Scheduled: {booking.scheduled}
                        </div>
                      )}
                    </div>
                    <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    {booking.status === 'scheduled' && (
                      <>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Ready */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Results Ready</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings
              .filter((b) => b.status === 'ready')
              .map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <div className="font-medium">{booking.tests.join(', ')}</div>
                      <div className="text-sm text-muted-foreground">
                        Collected: {booking.collected}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/10 text-success">New</Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
