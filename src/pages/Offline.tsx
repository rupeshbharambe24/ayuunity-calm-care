import { WifiOff, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Offline() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            You're currently viewing cached content. Some features may be limited.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="font-medium mb-2">Available Offline:</div>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Emergency contact information</li>
              <li>Recently viewed health records (last 10)</li>
              <li>Basic health profile</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-medium">Alternative Contact Methods</div>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Emergency Helpline</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Call: 1800-XXX-XXXX (Toll-free)
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">SMS Support</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Send SMS to: 56767<br />
                      Format: AYUHELP &lt;your message&gt;
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">IVR System</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Automated voice assistance<br />
                      Call: 1800-YYY-YYYY
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Try Reconnecting
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
