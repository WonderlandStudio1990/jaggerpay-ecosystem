import React from 'react';
import Link from 'next/link';
import { Menu, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              WonderPay
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <Link href="/dashboard/settings" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </Link>
          
          <div className="flex items-center space-x-3 ml-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-700">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 