import { CheckCircle, Circle, Package, Truck, Home } from 'lucide-react';

interface OrderStatusTimelineProps {
  status: string;
  ordered: string;
  estimated?: string;
  delivered?: string;
}

export function OrderStatusTimeline({ status, ordered, estimated, delivered }: OrderStatusTimelineProps) {
  const steps = [
    { key: 'requested', label: 'Requested', icon: Circle },
    { key: 'accepted', label: 'Accepted', icon: CheckCircle },
    { key: 'packed', label: 'Packed', icon: Package },
    { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-5 h-0.5 w-full ${
                    index < currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{ zIndex: 0 }}
                />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-background text-muted-foreground'
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Label */}
              <div
                className={`mt-2 text-xs text-center ${
                  isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </div>

              {/* Timestamp */}
              {isCurrent && estimated && (
                <div className="text-xs text-muted-foreground mt-1">
                  Est: {new Date(estimated).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
