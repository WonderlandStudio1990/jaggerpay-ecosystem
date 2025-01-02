import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from "@/lib/utils";
import { 
  Settings,
  User,
  Home,
  ArrowLeftCircle,
  Users,
  Building,
  CreditCard,
  Calculator,
} from "lucide-react";

interface SettingsSidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Overview', href: '/dashboard/settings', icon: Settings },
  { name: 'Your profile', href: '/dashboard/settings/profile', icon: User },
  { name: 'Address', href: '/dashboard/settings/address', icon: Home },
  { name: 'Members', href: '/dashboard/settings/members', icon: Users },
  { name: 'Bank accounts', href: '/dashboard/settings/bank-accounts', icon: Building },
  { name: 'Cards', href: '/dashboard/settings/cards', icon: CreditCard },
  { name: 'Accounting', href: '/dashboard/settings/accounting', icon: Calculator },
];

export const SettingsSidebar = ({ isOpen }: SettingsSidebarProps) => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className={cn(
      "w-64 border-r border-gray-200 bg-gray-50/50 backdrop-blur-sm",
      !isOpen && "hidden"
    )}>
      <div className="p-4">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mb-6"
        >
          <ArrowLeftCircle className="h-6 w-6" />
          <span>Back to Dashboard</span>
        </button>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg transition-colors",
                  isActive 
                    ? "bg-black text-white" 
                    : "hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}; 