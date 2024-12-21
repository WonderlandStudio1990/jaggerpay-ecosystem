import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsLayout from './SettingsLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const isSettingsPage = location.pathname.includes('/dashboard/organization-settings') || 
                        location.pathname.includes('/dashboard/settings');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="backdrop-blur-sm bg-white/30">
        <Header />
        <div className="flex h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className="flex-1 overflow-y-auto px-6 backdrop-blur-md bg-white/50">
            {isSettingsPage ? (
              <SettingsLayout>{children}</SettingsLayout>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;