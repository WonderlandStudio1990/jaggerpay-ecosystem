import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { ArrowRight, Banknote, CreditCard, Building } from 'lucide-react';

interface QuickPayFormData {
  recipientName: string;
  recipientEmail: string;
  amount: string;
  memo: string;
  paymentMethod: string;
}

const paymentMethods = [
  {
    id: 'bank',
    name: 'Bank Account',
    icon: Building,
    description: 'Pay directly from your linked bank account',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Pay using your business credit or debit card',
  },
  {
    id: 'balance',
    name: 'WonderPay Balance',
    icon: Banknote,
    description: 'Pay from your available WonderPay balance',
  },
];

const QuickPay = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<QuickPayFormData>();
  const selectedMethod = watch('paymentMethod');

  const onSubmit = async (data: QuickPayFormData) => {
    try {
      console.log('Processing payment:', data);
      // TODO: Implement payment processing
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">QuickPay</h1>
            <p className="text-sm text-muted-foreground">
              Send instant payments to anyone, anywhere
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      {...register('recipientName', { required: 'Recipient name is required' })}
                      placeholder="Enter recipient's name"
                    />
                    {errors.recipientName && (
                      <p className="text-sm text-destructive">{errors.recipientName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail">Recipient Email</Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      {...register('recipientEmail', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="Enter recipient's email"
                    />
                    {errors.recipientEmail && (
                      <p className="text-sm text-destructive">{errors.recipientEmail.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        className="pl-7"
                        {...register('amount', { 
                          required: 'Amount is required',
                          min: { value: 0.01, message: 'Amount must be greater than 0' }
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-destructive">{errors.amount.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memo">Memo (Optional)</Label>
                    <Input
                      id="memo"
                      {...register('memo')}
                      placeholder="What's this payment for?"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                            selectedMethod === method.id ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            id={method.id}
                            value={method.id}
                            className="hidden"
                            {...register('paymentMethod', { required: 'Please select a payment method' })}
                          />
                          <label
                            htmlFor={method.id}
                            className="flex flex-1 cursor-pointer items-center space-x-3"
                          >
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {method.description}
                              </p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Send Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent QuickPay Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      recipient: 'John Doe',
                      amount: 150.00,
                      date: '2024-01-15',
                      status: 'completed'
                    },
                    {
                      recipient: 'Jane Smith',
                      amount: 75.50,
                      date: '2024-01-14',
                      status: 'pending'
                    },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{payment.recipient}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${payment.amount.toFixed(2)}</p>
                        <p className={`text-sm ${
                          payment.status === 'completed' ? 'text-green-600' : 'text-orange-500'
                        }`}>
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QuickPay Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Instant Transfers</h3>
                  <p className="text-sm text-muted-foreground">
                    Send money instantly to anyone with an email address
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Bank-level security with advanced encryption
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    Transparent pricing with no surprise charges
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuickPay; 