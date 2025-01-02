import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { cn } from "@/lib/utils";
import { 
  Home,
  Receipt, 
  ArrowUpRight,
  Sparkles,
  Users, 
  Settings,
  FilePlus,
  ArrowDownRight,
  LogOut,
  Banknote
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Bill Pay', href: '/dashboard/bill-pay', icon: ArrowUpRight },
  { name: 'Receivables', href: '/dashboard/receivables', icon: ArrowDownRight },
  { name: 'Create Invoice', href: '/dashboard/bill-pay/generate', icon: FilePlus },
  { name: 'QuickPay', href: '/dashboard/quick-pay', icon: Banknote },
  { name: 'WonderPay Capital', href: '/dashboard/capital', icon: Sparkles },
  { name: 'Clients & Vendors', href: '/dashboard/clients', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { settings } = useSettings();

  const handleOrgClick = () => {
    router.push('/dashboard/settings');
  };

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Show toast notification
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to landing page after a short delay to ensure the toast is visible
    setTimeout(() => {
      router.replace('/');
    }, 500);
  };

  return (
    <div className={cn(
      "flex h-full w-64 flex-col backdrop-blur-md bg-white/50",
      !isOpen && "hidden"
    )}>
      <div className="flex flex-col flex-1 p-4">
        <div 
          onClick={handleOrgClick}
          className="flex items-center gap-3 px-3 mb-8 cursor-pointer hover:bg-black/5 rounded-lg transition-all duration-200 py-2 group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.svg"
              alt="WonderPay Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-medium text-gray-900 font-inter">WonderPay</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-black/5 font-inter",
                  isActive && "bg-gray-100/50 backdrop-blur-sm text-gray-900 font-medium"
                )}
              >
                <Icon className="h-[18px] w-[18px] stroke-[1.5px]" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Sign Out Button */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-black/5"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-[18px] w-[18px] stroke-[1.5px]" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}; 