import {
  LayoutDashboard,
  FileText,
  Calendar,
  Stethoscope,
  Users,
  AlertCircle,
  Pill,
  FlaskConical,
  Bell,
  Settings,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface NavigationRailProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'nav.records', href: '/records', icon: FileText },
  { name: 'nav.appointments', href: '/appointments', icon: Calendar },
  { name: 'nav.doctors', href: '/doctors', icon: Stethoscope },
  { name: 'nav.family', href: '/family', icon: Users },
  { name: 'nav.emergency', href: '/emergency', icon: AlertCircle },
  { name: 'nav.pharmacy', href: '/pharmacy', icon: Pill },
  { name: 'nav.labs', href: '/labs', icon: FlaskConical },
  { name: 'nav.notifications', href: '/notifications', icon: Bell },
  { name: 'nav.settings', href: '/settings', icon: Settings },
];

export function NavigationRail({ isOpen }: NavigationRailProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-card transition-all duration-200',
        'top-16',
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      )}
    >
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                'transition-opacity',
                isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
              )}
            >
              {t(item.name)}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
