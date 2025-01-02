import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';

// Mock data for a single invoice
const invoiceData = {
  id: '1',
  client: 'Tech Solutions Inc',
  amount: 2500.00,
  dueDate: '2024-02-15',
  status: 'pending',
  category: 'Consulting',
  description: 'Professional consulting services',
};

interface EditInvoiceFormData {
  client: string;
  amount: string;
  dueDate: string;
  category: string;
  description: string;
}

const EditInvoice = () => {
  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit, formState: { errors } } = useForm<EditInvoiceFormData>({
    defaultValues: {
      client: invoiceData.client,
      amount: invoiceData.amount.toString(),
      dueDate: invoiceData.dueDate,
      category: invoiceData.category,
      description: invoiceData.description,
    },
  });

  const onSubmit = async (data: EditInvoiceFormData) => {
    try {
      // TODO: Implement invoice update logic with Monite API
      console.log('Updating invoice:', id, data);
      router.push(`/dashboard/invoices/${id}`);
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
            <p className="text-sm text-muted-foreground">
              Update invoice information
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    {...register('client', { required: 'Client is required' })}
                    placeholder="Enter client name"
                  />
                  {errors.client && (
                    <p className="text-sm text-destructive">{errors.client.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    {...register('amount', { required: 'Amount is required' })}
                    placeholder="Enter amount"
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    {...register('dueDate', { required: 'Due date is required' })}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-destructive">{errors.dueDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    {...register('category', { required: 'Category is required' })}
                    placeholder="Enter invoice category"
                  />
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    {...register('description')}
                    placeholder="Enter invoice description (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Invoice</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditInvoice; 