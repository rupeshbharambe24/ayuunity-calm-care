import { useState } from 'react';
import { AppBar } from './AppBar';
import { NavigationRail } from './NavigationRail';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <AppBar onMenuClick={() => setNavOpen(!navOpen)} />
      
      {/* Overlay for mobile */}
      {navOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}
      
      <div className="flex">
        <NavigationRail isOpen={navOpen} />
        
        <main
          className={cn(
            'flex-1 transition-all duration-200',
            'pt-4 lg:ml-20'
          )}
        >
          <div className="container mx-auto px-4 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
