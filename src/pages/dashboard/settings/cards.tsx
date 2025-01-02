import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for payment cards
const paymentCards = [
  {
    id: '1',
    cardType: 'Visa',
    cardNumber: '****4567',
    expiryDate: '12/25',
    cardholderName: 'John Doe',
    status: 'primary',
    lastUsed: '2024-02-15',
  },
  {
    id: '2',
    cardType: 'Mastercard',
    cardNumber: '****7890',
    expiryDate: '06/26',
    cardholderName: 'John Doe',
    status: 'active',
    lastUsed: '2024-02-10',
  },
];

const Cards = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Cards</h1>
            <p className="text-sm text-muted-foreground">
              Manage your payment cards and preferences
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {paymentCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.cardType}
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
                      Remove Card
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {card.cardholderName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Card: {card.cardNumber}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expiry Date:</span>
                    <span>{card.expiryDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Used:</span>
                    <span>{new Date(card.lastUsed).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={card.status === 'primary' ? 'default' : 'secondary'}
                    >
                      {card.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Card Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your card information is encrypted and securely stored. We use
                industry-standard security measures to protect your sensitive data.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• PCI DSS compliant storage</li>
                <li>• End-to-end encryption</li>
                <li>• Fraud monitoring and prevention</li>
                <li>• Secure payment processing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Cards; 