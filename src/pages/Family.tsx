import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Plus, Calendar, Syringe, Pill, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Family() {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState<string>('self');

  const members = [
    { id: 'self', name: 'You', relation: 'Self', avatar: '', age: 32 },
    { id: '1', name: 'John Doe', relation: 'Spouse', avatar: '', age: 30 },
    { id: '2', name: 'Emma Doe', relation: 'Daughter', avatar: '', age: 5 },
  ];

  const vaccinations = [
    {
      memberId: '2',
      name: 'MMR (Measles, Mumps, Rubella)',
      dueDate: '2024-02-15',
      status: 'due',
    },
    {
      memberId: '2',
      name: 'DTP Booster',
      completedDate: '2024-01-10',
      status: 'completed',
    },
    {
      memberId: 'self',
      name: 'Tetanus Booster',
      dueDate: '2024-03-01',
      status: 'upcoming',
    },
  ];

  const reminders = [
    {
      memberId: 'self',
      medication: 'Aspirin 81mg',
      schedule: 'Daily at 9:00 AM',
      purpose: 'Heart health',
      active: true,
    },
    {
      memberId: '1',
      medication: 'Metformin 500mg',
      schedule: 'Twice daily (8 AM, 8 PM)',
      purpose: 'Diabetes',
      active: true,
    },
  ];

  const upcomingForMember = (memberId: string) => {
    const memberVaccinations = vaccinations.filter(
      (v) => v.memberId === memberId && (v.status === 'due' || v.status === 'upcoming')
    );
    const memberReminders = reminders.filter((r) => r.memberId === memberId && r.active);
    return { vaccinations: memberVaccinations, reminders: memberReminders };
  };

  const currentMember = members.find((m) => m.id === selectedMember);
  const upcoming = upcomingForMember(selectedMember);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('nav.family')}</h1>
          <p className="text-muted-foreground mt-1">
            Manage health records for your family
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Full Name</Label>
                <Input id="memberName" placeholder="Enter name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relation">Relationship</Label>
                <Select>
                  <SelectTrigger id="relation">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberDob">Date of Birth</Label>
                <Input id="memberDob" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberContact">Contact (Optional)</Label>
                <Input id="memberContact" type="tel" placeholder="+91 98765 43210" />
              </div>

              <Button className="w-full">Add Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Member Switcher */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:bg-muted/50 min-w-[120px] ${
                  selectedMember === member.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.relation}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcoming.vaccinations.length === 0 && upcoming.reminders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming items
                </div>
              ) : (
                <>
                  {upcoming.vaccinations.map((vax, i) => (
                    <div
                      key={i}
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <Syringe className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{vax.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Due: {vax.dueDate}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-warning/10 text-warning text-xs"
                        >
                          {vax.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {upcoming.reminders.map((reminder, i) => (
                    <div
                      key={i}
                      className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <Pill className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{reminder.medication}</div>
                          <div className="text-xs text-muted-foreground">
                            {reminder.schedule}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {currentMember?.name}'s Health Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="vaccinations">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
              </TabsList>

              <TabsContent value="vaccinations" className="space-y-4 mt-4">
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Log Vaccine
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Vaccination</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Vaccine Name</Label>
                          <Input placeholder="e.g., COVID-19 Booster" />
                        </div>
                        <div className="space-y-2">
                          <Label>Date Given</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Upload Certificate (Optional)</Label>
                          <Input type="file" accept=".pdf,.jpg,.png" />
                        </div>
                        <Button className="w-full">Log Vaccination</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3">
                  {vaccinations
                    .filter((v) => v.memberId === selectedMember)
                    .map((vax, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <div className="font-medium">{vax.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {vax.status === 'completed'
                              ? `Completed: ${vax.completedDate}`
                              : `Due: ${vax.dueDate}`}
                          </div>
                        </div>
                        <Badge
                          variant={vax.status === 'completed' ? 'outline' : 'default'}
                          className={
                            vax.status === 'completed'
                              ? 'bg-success/10 text-success'
                              : vax.status === 'due'
                              ? 'bg-warning/10 text-warning'
                              : 'bg-info/10 text-info'
                          }
                        >
                          {vax.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="medications" className="space-y-4 mt-4">
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Reminder
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Medication Reminder</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Medication Name</Label>
                          <Input placeholder="e.g., Aspirin 81mg" />
                        </div>
                        <div className="space-y-2">
                          <Label>Frequency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="thrice">Three times daily</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Purpose</Label>
                          <Input placeholder="e.g., Heart health" />
                        </div>
                        <Button className="w-full">Create Reminder</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3">
                  {reminders
                    .filter((r) => r.memberId === selectedMember)
                    .map((reminder, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between rounded-lg border p-4"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{reminder.medication}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {reminder.schedule}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Purpose: {reminder.purpose}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              reminder.active
                                ? 'bg-success/10 text-success'
                                : 'bg-muted text-muted-foreground'
                            }
                          >
                            {reminder.active ? 'Active' : 'Paused'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
