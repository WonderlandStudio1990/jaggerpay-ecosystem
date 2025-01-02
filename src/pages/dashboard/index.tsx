import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for recent transactions
const recentTransactions = [
  {
    id: '1',
    description: 'Invoice #INV-001',
    amount: 2500.00,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: '2',
    description: 'Payment to Studio Services',
    amount: -1200.00,
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: '3',
    description: 'Invoice #INV-002',
    amount: 3450.00,
    status: 'completed',
    date: '2024-01-13',
  },
];

// Mock data for statistics
const stats = [
  {
    title: 'Monthly Revenue',
    value: '$24,890.00',
    description: '+20.1% from last month',
  },
  {
    title: 'Outstanding Bills',
    value: '$4,250.00',
    description: '12 bills pending',
  },
  {
    title: 'Total Clients',
    value: '48',
    description: '+4 new this month',
  },
  {
    title: 'Success Rate',
    value: '98.5%',
    description: 'Processing rate',
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'completed' ? 'success' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;