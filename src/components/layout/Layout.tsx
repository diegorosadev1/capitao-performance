import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { UserProfile } from '../../types';

interface LayoutProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentUser,
  onSwitchUser,
  currentRoute,
  onNavigate,
  onLogout,
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-neutral-950 text-neutral-100 selection:bg-neutral-800 selection:text-neutral-100">
      {/* Full-width Top Header matching image */}
      <Header
        currentUser={currentUser}
        onSwitchUser={onSwitchUser}
        onOpenMobileMenu={() => setIsMobileOpen(true)}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="flex flex-1 min-w-0">
        {/* Sidebar Navigation */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          userRole={currentUser.role}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
};
