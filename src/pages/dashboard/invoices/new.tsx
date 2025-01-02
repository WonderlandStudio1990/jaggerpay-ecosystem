import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface NewInvoiceFormData {
  client: string;
  amount: string;
  dueDate: string;
  category: string;
  description: string;
}

const NewInvoice = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<NewInvoiceFormData>();

  const onSubmit = async (data: NewInvoiceFormData) => {
    try {
      // TODO: Implement invoice creation logic with Monite API
      console.log('Creating new invoice:', data);
      router.push('/dashboard/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Invoice</h1>
            <p className="text-sm text-muted-foreground">
              Create a new invoice for your client
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
                <Button type="submit">Create Invoice</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewInvoice; 