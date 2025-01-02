import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, FileSpreadsheet } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AccountingSettings = () => {
  const [fiscalYear, setFiscalYear] = useState('january');
  const [taxYear, setTaxYear] = useState('calendar');
  const [reportFormat, setReportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('monthly');

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
            <p className="text-sm text-muted-foreground">
              Configure your accounting preferences and integrations
            </p>
          </div>
          <Button>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <Select value={fiscalYear} onValueChange={setFiscalYear}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="tax-year">Tax Year</Label>
                  <Select value={taxYear} onValueChange={setTaxYear}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select tax year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">Calendar Year</SelectItem>
                      <SelectItem value="fiscal">Fiscal Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Reconciliation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically reconcile transactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">QuickBooks</p>
                    <p className="text-sm text-muted-foreground">
                      Sync transactions and reports
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Xero</p>
                    <p className="text-sm text-muted-foreground">
                      Sync transactions and reports
                    </p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sage</p>
                    <p className="text-sm text-muted-foreground">
                      Sync transactions and reports
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Export Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Report Format</h3>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Date Range</h3>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Include in Export</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Switch id="transactions" defaultChecked />
                  <Label htmlFor="transactions">Transactions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="invoices" defaultChecked />
                  <Label htmlFor="invoices">Invoices</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="expenses" defaultChecked />
                  <Label htmlFor="expenses">Expenses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="reports" defaultChecked />
                  <Label htmlFor="reports">Reports</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AccountingSettings;