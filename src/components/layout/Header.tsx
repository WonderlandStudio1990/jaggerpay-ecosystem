import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="border-b bg-white/30 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.svg" 
            alt="WonderPay Logo" 
            className="h-8 w-auto"
          />
          <h2 className="text-2xl font-bold text-gray-900">WonderPay</h2>
        </div>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}; 