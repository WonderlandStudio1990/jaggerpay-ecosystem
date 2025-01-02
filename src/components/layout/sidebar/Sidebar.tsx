import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  FileText, 
  CreditCard, 
  Users, 
  PieChart,
  Zap,
  Settings,
  Building2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: Home, 
    href: '/dashboard' 
  },
  { 
    title: 'Bill Pay', 
    icon: FileText, 
    href: '/dashboard/bill-pay' 
  },
  { 
    title: 'Quick Pay', 
    icon: Zap, 
    href: '/dashboard/quick-pay' 
  },
  { 
    title: 'Receivables', 
    icon: CreditCard, 
    href: '/dashboard/receivables' 
  },
  { 
    title: 'Clients', 
    icon: Users, 
    href: '/dashboard/clients' 
  },
  { 
    title: 'Analytics', 
    icon: PieChart, 
    href: '/dashboard/analytics' 
  },
];

const settingsItems = [
  { 
    title: 'Settings', 
    icon: Settings, 
    href: '/dashboard/settings' 
  },
  { 
    title: 'Organization', 
    icon: Building2, 
    href: '/dashboard/organization-settings' 
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const router = useRouter();

  const isActiveLink = (href: string) => {
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-lg border-r border-gray-200/50 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-gray-200/50">
          {settingsItems.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 