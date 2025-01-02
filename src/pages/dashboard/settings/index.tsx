import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, Building2, CreditCard, Calculator, 
  MapPin, Users2, ChevronRight 
} from 'lucide-react';

const settingsSections = [
  {
    title: 'Profile',
    description: 'Manage your business profile and preferences',
    icon: User,
    href: '/dashboard/settings/profile',
  },
  {
    title: 'Bank Accounts',
    description: 'Connect and manage your bank accounts',
    icon: Building2,
    href: '/dashboard/settings/bank-accounts',
  },
  {
    title: 'Payment Cards',
    description: 'Manage your payment cards',
    icon: CreditCard,
    href: '/dashboard/settings/cards',
  },
  {
    title: 'Accounting',
    description: 'Configure accounting preferences and integrations',
    icon: Calculator,
    href: '/dashboard/settings/accounting',
  },
  {
    title: 'Address',
    description: 'Update your business address information',
    icon: MapPin,
    href: '/dashboard/settings/address',
  },
  {
    title: 'Team Members',
    description: 'Manage team members and permissions',
    icon: Users2,
    href: '/dashboard/settings/members',
  },
];

const Settings = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.href}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => router.push(section.href)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {section.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 