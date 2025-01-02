import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

// Mock data for bills
const bills = [
  {
    id: '1',
    vendor: 'Acme Corp',
    amount: 1250.00,
    dueDate: '2024-01-30',
    status: 'pending',
    category: 'Services',
  },
  {
    id: '2',
    vendor: 'Office Supplies Inc',
    amount: 450.00,
    dueDate: '2024-02-05',
    status: 'paid',
    category: 'Supplies',
  },
  {
    id: '3',
    vendor: 'Tech Solutions Ltd',
    amount: 2800.00,
    dueDate: '2024-02-15',
    status: 'overdue',
    category: 'Software',
  },
];

const BillPay = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bill Pay</h1>
            <p className="text-sm text-muted-foreground">
              Manage and pay your bills in one place
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Bill
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,500.00</div>
              <p className="text-xs text-muted-foreground">
                3 bills pending payment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Due This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250.00</div>
              <p className="text-xs text-muted-foreground">
                1 bill due soon
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Paid This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,750.00</div>
              <p className="text-xs text-muted-foreground">
                5 bills paid
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.vendor}</TableCell>
                    <TableCell>${bill.amount.toFixed(2)}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bill.status === 'paid'
                            ? 'default'
                            : bill.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={bill.status === 'paid'}
                      >
                        Pay Now
                      </Button>
                    </TableCell>
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

export default BillPay;