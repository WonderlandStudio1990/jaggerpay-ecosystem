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
import { Plus, ArrowDownRight } from 'lucide-react';

// Mock data for receivables
const receivables = [
  {
    id: '1',
    client: 'Tech Solutions Inc',
    amount: 2500.00,
    dueDate: '2024-02-15',
    status: 'current',
    invoiceNumber: 'INV-2024-001',
    aging: '15 days',
  },
  {
    id: '2',
    client: 'Design Studio Co',
    amount: 1800.00,
    dueDate: '2024-02-20',
    status: 'overdue',
    invoiceNumber: 'INV-2024-002',
    aging: '30 days',
  },
  {
    id: '3',
    client: 'Marketing Agency',
    amount: 3500.00,
    dueDate: '2024-02-10',
    status: 'paid',
    invoiceNumber: 'INV-2024-003',
    aging: '0 days',
  },
];

const Receivables = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Receivables</h1>
            <p className="text-sm text-muted-foreground">
              Track and manage your accounts receivable
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Receivables
              </CardTitle>
              <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$7,800.00</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,500.00</div>
              <p className="text-xs text-muted-foreground">
                1 invoice
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">$1,800.00</div>
              <p className="text-xs text-muted-foreground">
                1 invoice
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Paid (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$3,500.00</div>
              <p className="text-xs text-muted-foreground">
                1 invoice
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Receivables List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Aging</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivables.map((receivable) => (
                  <TableRow key={receivable.id}>
                    <TableCell className="font-medium">
                      {receivable.invoiceNumber}
                    </TableCell>
                    <TableCell>{receivable.client}</TableCell>
                    <TableCell>${receivable.amount.toFixed(2)}</TableCell>
                    <TableCell>{receivable.dueDate}</TableCell>
                    <TableCell>{receivable.aging}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          receivable.status === 'paid'
                            ? 'default'
                            : receivable.status === 'current'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {receivable.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={receivable.status === 'paid'}
                      >
                        Send Reminder
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

export default Receivables; 