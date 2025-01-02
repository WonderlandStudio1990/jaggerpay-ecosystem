import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash, Send } from 'lucide-react';

// Mock data for a single invoice
const invoiceData = {
  id: '1',
  client: 'Tech Solutions Inc',
  amount: 2500.00,
  dueDate: '2024-02-15',
  status: 'pending',
  category: 'Consulting',
  description: 'Professional consulting services',
  createdAt: '2024-01-20',
  paymentHistory: [
    {
      id: '1',
      date: '2024-01-25',
      amount: 1000.00,
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 1500.00,
      status: 'pending',
    },
  ],
};

const InvoiceDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    // TODO: Implement delete functionality with Monite API
    console.log('Deleting invoice:', id);
    router.push('/dashboard/invoices');
  };

  const handleEdit = () => {
    router.push(`/dashboard/invoices/${id}/edit`);
  };

  const handleSendReminder = async () => {
    // TODO: Implement send reminder functionality with Monite API
    console.log('Sending reminder for invoice:', id);
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
            <h1 className="text-3xl font-bold tracking-tight">Invoice Details</h1>
            <p className="text-sm text-muted-foreground">
              View and manage invoice information
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSendReminder}
              disabled={invoiceData.status === 'paid'}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
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
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Client</p>
                  <p className="text-lg font-semibold">{invoiceData.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">${invoiceData.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                  <p className="text-lg font-semibold">{invoiceData.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      invoiceData.status === 'paid'
                        ? 'default'
                        : invoiceData.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {invoiceData.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-lg font-semibold">{invoiceData.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-lg font-semibold">{invoiceData.createdAt}</p>
                </div>
              </div>
              {invoiceData.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-lg">{invoiceData.description}</p>
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
                {invoiceData.paymentHistory.map((payment) => (
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
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Remaining Balance
                </p>
                <p className="text-2xl font-bold">
                  ${invoiceData.amount.toFixed(2)}
                </p>
              </div>
              <Button disabled={invoiceData.status === 'paid'}>
                Record Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetail; 