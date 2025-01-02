import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock data for demonstration
const stats = [
  {
    title: 'Total Revenue',
    value: '$54,250.00',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Pending Bills',
    value: '23',
    change: '-4',
    trend: 'down',
    icon: FileText,
  },
  {
    title: 'Active Clients',
    value: '156',
    change: '+12',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Growth Rate',
    value: '24.5%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'payment',
    description: 'Payment received from Acme Corp',
    amount: '+$12,450.00',
    date: '2 hours ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'invoice',
    description: 'New invoice created for Stark Industries',
    amount: '$8,800.00',
    date: '5 hours ago',
    status: 'pending',
  },
  {
    id: 3,
    type: 'bill',
    description: 'Bill paid to Wayne Enterprises',
    amount: '-$15,200.00',
    date: '1 day ago',
    status: 'completed',
  },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      activity.amount.startsWith('+') 
                        ? 'text-green-600' 
                        : activity.amount.startsWith('-')
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}>
                      {activity.amount}
                    </p>
                    <p className={`text-xs mt-1 ${
                      activity.status === 'completed' 
                        ? 'text-green-600' 
                        : 'text-orange-600'
                    }`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage; 