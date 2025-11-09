import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, FileText, Download, Plus, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Payments() {
  const { t } = useTranslation();

  const invoices = [
    {
      id: 'INV-2024-001',
      type: 'Lab Test',
      description: 'CBC + Lipid Profile',
      amount: 950,
      date: '2024-01-15',
      status: 'paid',
    },
    {
      id: 'INV-2024-002',
      type: 'Consultation',
      description: 'Dr. Sarah Johnson - Teleconsult',
      amount: 500,
      date: '2024-01-10',
      status: 'paid',
    },
    {
      id: 'INV-2024-003',
      type: 'Pharmacy',
      description: 'Medicine Order #1234',
      amount: 450,
      date: '2024-01-08',
      status: 'paid',
    },
  ];

  const policies = [
    {
      id: '1',
      insurer: 'Star Health Insurance',
      plan: 'Comprehensive Family Floater',
      memberId: 'SH2024001',
      coverage: '₹5,00,000',
      expiry: '2025-03-15',
      active: true,
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments & Insurance</h1>
        <p className="text-muted-foreground mt-1">
          Manage your transactions and insurance policies
        </p>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="awareness">Resources</TabsTrigger>
        </TabsList>

        {/* Invoices */}
        <TabsContent value="invoices" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Payment History
                </CardTitle>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{invoice.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {invoice.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {invoice.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {invoice.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">₹{invoice.amount}</div>
                        <Badge
                          variant="outline"
                          className="bg-success/10 text-success text-xs"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
                  <div className="text-2xl font-bold">₹{invoices.reduce((sum, inv) => sum + inv.amount, 0)}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground mb-1">This Month</div>
                  <div className="text-2xl font-bold">₹1,900</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground mb-1">Invoices</div>
                  <div className="text-2xl font-bold">{invoices.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance */}
        <TabsContent value="insurance" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Insurance Policies
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Policy
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Insurance Policy</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Insurer Name</Label>
                        <Input placeholder="e.g., Star Health Insurance" />
                      </div>
                      <div className="space-y-2">
                        <Label>Plan Name</Label>
                        <Input placeholder="e.g., Family Floater" />
                      </div>
                      <div className="space-y-2">
                        <Label>Member ID</Label>
                        <Input placeholder="Policy/Member ID" />
                      </div>
                      <div className="space-y-2">
                        <Label>Coverage Amount</Label>
                        <Input placeholder="e.g., ₹5,00,000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Upload Policy Card (Optional)</Label>
                        <Input type="file" accept=".pdf,.jpg,.png" />
                      </div>
                      <Button className="w-full">Add Policy</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-lg">{policy.insurer}</div>
                        <div className="text-muted-foreground">{policy.plan}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          policy.active
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {policy.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Member ID</div>
                        <div className="font-medium">{policy.memberId}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Coverage</div>
                        <div className="font-medium">{policy.coverage}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Expires</div>
                        <div className="font-medium">{policy.expiry}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}

                {policies.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No insurance policies added yet</p>
                    <p className="text-sm mt-2">Add your policies to keep track of coverage</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources/Awareness */}
        <TabsContent value="awareness" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Healthcare Schemes & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="font-medium text-lg mb-2">
                  Pradhan Mantri Jan Arogya Yojana (PMJAY)
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  India's largest government health insurance scheme providing coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.
                </div>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>

              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="font-medium text-lg mb-2">
                  Third Party Administrators (TPA)
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Understanding TPAs and how they process your health insurance claims. Learn about cashless hospitalization and claim procedures.
                </div>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>

              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="font-medium text-lg mb-2">
                  Insurance Portability
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Learn how to port your existing health insurance policy to a new insurer without losing accumulated benefits.
                </div>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>

              <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="font-medium text-lg mb-2">
                  Cashless vs Reimbursement Claims
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Understand the difference between cashless and reimbursement claims and when to use each option.
                </div>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
