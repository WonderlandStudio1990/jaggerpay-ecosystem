import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';

// Mock data for a single bill
const billData = {
  id: '1',
  vendor: 'Acme Corp',
  amount: 1250.00,
  dueDate: '2024-01-30',
  status: 'pending',
  category: 'Services',
  description: 'Monthly service subscription',
};

interface EditBillFormData {
  vendor: string;
  amount: string;
  dueDate: string;
  category: string;
  description: string;
}

const EditBill = () => {
  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit, formState: { errors } } = useForm<EditBillFormData>({
    defaultValues: {
      vendor: billData.vendor,
      amount: billData.amount.toString(),
      dueDate: billData.dueDate,
      category: billData.category,
      description: billData.description,
    },
  });

  const onSubmit = async (data: EditBillFormData) => {
    try {
      // TODO: Implement bill update logic with Monite API
      console.log('Updating bill:', id, data);
      router.push(`/dashboard/bill-pay/${id}`);
    } catch (error) {
      console.error('Error updating bill:', error);
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
            <h1 className="text-3xl font-bold tracking-tight">Edit Bill</h1>
            <p className="text-sm text-muted-foreground">
              Update bill information
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    {...register('vendor', { required: 'Vendor is required' })}
                    placeholder="Enter vendor name"
                  />
                  {errors.vendor && (
                    <p className="text-sm text-destructive">{errors.vendor.message}</p>
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
                    placeholder="Enter bill category"
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
                    placeholder="Enter bill description (optional)"
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
                <Button type="submit">Update Bill</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditBill; 