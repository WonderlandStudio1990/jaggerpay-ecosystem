import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

// Mock data for a single bill
const billData = {
  id: '1',
  vendor: 'Acme Corp',
  amount: 1250.00,
  dueDate: '2024-01-30',
  status: 'pending',
  category: 'Services',
  description: 'Monthly service subscription',
  createdAt: '2024-01-15',
  paymentHistory: [
    {
      id: '1',
      date: '2024-01-15',
      amount: 500.00,
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-01-20',
      amount: 750.00,
      status: 'pending',
    },
  ],
};

const BillDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    // TODO: Implement delete functionality with Monite API
    console.log('Deleting bill:', id);
    router.push('/dashboard/bill-pay');
  };

  const handleEdit = () => {
    router.push(`/dashboard/bill-pay/${id}/edit`);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Bill Details</h1>
            <p className="text-sm text-muted-foreground">
              View and manage bill information
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bill Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="text-lg font-semibold">{billData.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">${billData.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                  <p className="text-lg font-semibold">{billData.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      billData.status === 'paid'
                        ? 'default'
                        : billData.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {billData.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-lg font-semibold">{billData.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-lg font-semibold">{billData.createdAt}</p>
                </div>
              </div>
              {billData.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-lg">{billData.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billData.paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{payment.date}</p>
                      <Badge
                        variant={payment.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold">
                      ${payment.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Remaining Balance
                </p>
                <p className="text-2xl font-bold">
                  ${billData.amount.toFixed(2)}
                </p>
              </div>
              <Button disabled={billData.status === 'paid'}>
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillDetail; 