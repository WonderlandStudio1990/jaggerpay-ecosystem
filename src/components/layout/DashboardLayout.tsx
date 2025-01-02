import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from './Header';
import { Sidebar } from './sidebar/Sidebar';
import { SettingsSidebar } from './sidebar/SettingsSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isSettingsPage = router.pathname.includes('/dashboard/settings');
  const isInvoiceGenerator = router.pathname === '/bill-pay/generate';

  // If we're on the invoice generator page, render without sidebars
  if (isInvoiceGenerator) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Only render one sidebar based on the current route */}
        {isSettingsPage ? (
          <SettingsSidebar isOpen={sidebarOpen} />
        ) : (
          <Sidebar isOpen={sidebarOpen} />
        )}
        <main className="flex-1 overflow-y-auto px-6 backdrop-blur-md bg-white/50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 