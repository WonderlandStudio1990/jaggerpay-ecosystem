import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

const capitalProducts = [
  {
    id: '1',
    name: 'Working Capital Advance',
    description: 'Get instant access to working capital based on your receivables',
    limit: '$250,000',
    term: '12 months',
    rate: '1.5% - 3.5%',
    status: 'available',
  },
  {
    id: '2',
    name: 'Revenue Based Financing',
    description: 'Flexible financing that scales with your revenue',
    limit: '$500,000',
    term: '18 months',
    rate: '2% - 4%',
    status: 'coming_soon',
  },
  {
    id: '3',
    name: 'Term Loan',
    description: 'Fixed-term business loans for established companies',
    limit: '$1,000,000',
    term: '24-36 months',
    rate: '4% - 8%',
    status: 'coming_soon',
  },
];

const Capital = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">WonderPay Capital</h1>
            <p className="text-sm text-muted-foreground">
              Access flexible financing solutions for your business
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {capitalProducts.map((product) => (
            <Card key={product.id} className="relative overflow-hidden">
              {product.status === 'coming_soon' && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Coming Soon
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{product.name}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {product.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Limit</p>
                      <p className="text-2xl font-bold">{product.limit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Term</p>
                      <p className="text-2xl font-bold">{product.term}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rate</p>
                    <p className="text-lg font-semibold">{product.rate}</p>
                  </div>
                  <Button 
                    className="w-full"
                    disabled={product.status === 'coming_soon'}
                  >
                    {product.status === 'available' ? (
                      <>
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Coming Soon'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose WonderPay Capital?</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">Fast & Simple</h3>
              <p className="text-sm text-muted-foreground">
                Quick application process with decisions in as little as 24 hours
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Terms</h3>
              <p className="text-sm text-muted-foreground">
                Customized financing solutions that fit your business needs
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Competitive Rates</h3>
              <p className="text-sm text-muted-foreground">
                Transparent pricing with no hidden fees
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Capital; 