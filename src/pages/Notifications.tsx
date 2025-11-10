import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, UserCheck, AlertCircle, Bell, CheckCheck } from 'lucide-react';

export default function Notifications() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const notifications = [
    {
      id: '1',
      category: 'appointments',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Priya Sharma is tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
      icon: Calendar,
    },
    {
      id: '2',
      category: 'labs',
      title: 'Lab Results Ready',
      message: 'Your Complete Blood Count results are now available',
      time: '5 hours ago',
      read: false,
      icon: FileText,
    },
    {
      id: '3',
      category: 'records',
      title: 'Record Shared',
      message: 'Dr. Kumar accessed your medical records',
      time: '1 day ago',
      read: true,
      icon: UserCheck,
    },
    {
      id: '4',
      category: 'consent',
      title: 'Consent Request',
      message: 'Apollo Hospital is requesting access to your vaccination records',
      time: '2 days ago',
      read: false,
      icon: AlertCircle,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const categoryIcons = {
    appointments: Calendar,
    labs: FileText,
    records: UserCheck,
    consent: AlertCircle,
  };

  const categoryColors = {
    appointments: 'text-primary',
    labs: 'text-info',
    records: 'text-accent',
    consent: 'text-warning',
  };

  const filteredNotifications =
    selectedCategory === 'all'
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bell className="h-8 w-8" />
            {t('nav.notifications')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <Button variant="outline" className="gap-2 sm:w-auto w-full">
          <CheckCheck className="h-4 w-4" />
          Mark All Read
        </Button>
      </div>

      {/* Filters */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Appointments
          </TabsTrigger>
          <TabsTrigger value="labs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Labs
          </TabsTrigger>
          <TabsTrigger value="records" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Records
          </TabsTrigger>
          <TabsTrigger value="consent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Consent
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>
                {selectedCategory === 'all' ? 'All Notifications' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Notifications`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    const colorClass =
                      categoryColors[notification.category as keyof typeof categoryColors];

                    return (
                      <div
                        key={notification.id}
                        className={`flex gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer ${
                          !notification.read ? 'bg-primary/5 border-primary/20' : ''
                        }`}
                      >
                        <div className={`flex-shrink-0 ${colorClass}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 break-words">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                            {!notification.read && (
                              <Badge className="text-xs bg-primary">New</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No notifications in this category.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
