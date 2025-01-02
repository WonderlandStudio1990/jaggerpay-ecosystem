import React from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white/50 backdrop-blur-lg rounded-lg shadow-lg p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 