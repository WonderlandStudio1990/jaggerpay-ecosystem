import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Building2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for bank accounts
const bankAccounts = [
  {
    id: '1',
    bankName: 'Chase Bank',
    accountType: 'Checking',
    accountNumber: '****4567',
    routingNumber: '****1234',
    status: 'primary',
    lastUsed: '2024-02-15',
  },
  {
    id: '2',
    bankName: 'Bank of America',
    accountType: 'Savings',
    accountNumber: '****7890',
    routingNumber: '****5678',
    status: 'active',
    lastUsed: '2024-02-10',
  },
];

const BankAccounts = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bank Accounts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your connected bank accounts
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Bank Account
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {bankAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {account.bankName}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Set as Primary</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {account.accountType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Account: {account.accountNumber}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Routing Number:</span>
                    <span>{account.routingNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Used:</span>
                    <span>{new Date(account.lastUsed).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={account.status === 'primary' ? 'default' : 'secondary'}
                    >
                      {account.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bank Account Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your bank account information is encrypted and securely stored. We use
                industry-standard security measures to protect your sensitive data.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Bank-level SSL encryption</li>
                <li>• Regular security audits</li>
                <li>• Two-factor authentication for sensitive operations</li>
                <li>• Automatic logout after inactivity</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BankAccounts; 