import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pill, Search, MapPin, Clock, Truck, Phone, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OrderStatusTimeline } from '@/components/OrderStatusTimeline';

export default function Pharmacy() {
  const { t } = useTranslation();
  const [selectedRx, setSelectedRx] = useState<string | null>(null);

  const prescriptions = [
    { id: '1', title: 'Prescription - Dr. Smith', date: '2024-01-15', items: 3 },
    { id: '2', title: 'Prescription - Dr. Johnson', date: '2024-01-08', items: 2 },
  ];

  const orders = [
    {
      id: '1',
      pharmacy: 'Apollo Pharmacy',
      status: 'out-for-delivery',
      items: 3,
      total: 450,
      ordered: '2024-01-16 10:30',
      estimated: '2024-01-16 18:00',
    },
    {
      id: '2',
      pharmacy: 'MedPlus',
      status: 'delivered',
      items: 2,
      total: 320,
      ordered: '2024-01-10 14:20',
      delivered: '2024-01-11 11:15',
    },
  ];

  const statusColors = {
    'requested': 'bg-muted text-muted-foreground',
    'accepted': 'bg-info/10 text-info',
    'packed': 'bg-warning/10 text-warning',
    'out-for-delivery': 'bg-primary/10 text-primary',
    'delivered': 'bg-success/10 text-success',
    'cancelled': 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('nav.pharmacy')}</h1>
          <p className="text-muted-foreground mt-1">
            Order medicines from trusted pharmacies
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Pill className="h-4 w-4" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Place Pharmacy Order</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Prescription Selection */}
              <div className="space-y-3">
                <Label>Select Prescription</Label>
                <RadioGroup value={selectedRx || ''} onValueChange={setSelectedRx}>
                  {prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={rx.id} id={rx.id} />
                        <Label htmlFor={rx.id} className="cursor-pointer">
                          <div className="font-medium">{rx.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {rx.date} • {rx.items} items
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <Button variant="outline" size="sm" className="w-full">
                  Upload New Prescription
                </Button>
              </div>

              {/* Pharmacy Finder */}
              <div className="space-y-3">
                <Label>Select Pharmacy</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search pharmacies nearby..." className="pl-9" />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {['Apollo Pharmacy', 'MedPlus', 'NetMeds Store'].map((pharmacy, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{pharmacy}</div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            2.5 km
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Open now
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">Select</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="space-y-3">
                <Label>Delivery Method</Label>
                <RadioGroup defaultValue="delivery">
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-primary" />
                          <span className="font-medium">Home Delivery</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Est. 2-4 hours</div>
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="cursor-pointer">
                        <div className="font-medium">Store Pickup</div>
                        <div className="text-sm text-muted-foreground">Ready in 30 mins</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Special instructions for the pharmacy..."
                  rows={3}
                />
              </div>

              <Button className="w-full">Place Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Orders */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').map((order) => (
              <div
                key={order.id}
                className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-medium text-lg">{order.pharmacy}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.items} items • ₹{order.total}
                    </div>
                  </div>
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {order.status.replace('-', ' ')}
                  </Badge>
                </div>

                <OrderStatusTimeline
                  status={order.status}
                  ordered={order.ordered}
                  estimated={order.estimated}
                />

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Pharmacy
                  </Button>
                  {order.status === 'requested' && (
                    <Button variant="ghost" size="sm" className="flex-1 gap-2">
                      <X className="h-4 w-4" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.filter(o => o.status === 'delivered').map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-medium">{order.pharmacy}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.items} items • ₹{order.total} • Delivered on {order.delivered}
                  </div>
                </div>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                  {order.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
