import { AlertCircle } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-warning text-warning-foreground px-4 py-2">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Running in Demo Mode — No server connected. Data here is sample only.</span>
      </div>
    </div>
  );
}
