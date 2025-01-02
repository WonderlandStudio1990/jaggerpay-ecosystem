import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Edit, Trash, Building, User, Mail, Phone, MapPin, FileText, DollarSign } from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock client data
const client = {
  id: 'CLIENT-001',
  name: 'Acme Studios',
  contactPerson: 'John Doe',
  email: 'john@acmestudios.com',
  phone: '+1 (555) 123-4567',
  address: '123 Studio Ave, Los Angeles, CA 90028',
  type: 'Studio',
  status: 'active',
  totalRevenue: 15000.00,
  notes: 'Premier recording studio specializing in acoustic and live band recordings.',
  createdAt: '2024-01-15',
  recentInvoices: [
    {
      id: 'INV-001',
      date: '2024-02-15',
      amount: 3500.00,
      status: 'paid',
      description: 'Recording session - March 2024',
    },
    {
      id: 'INV-002',
      date: '2024-02-01',
      amount: 2500.00,
      status: 'paid',
      description: 'Studio rental - February 2024',
    },
    {
      id: 'INV-003',
      date: '2024-01-15',
      amount: 1800.00,
      status: 'pending',
      description: 'Equipment rental',
    },
  ],
};

const ClientDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      // Mock deletion - will be connected to backend later
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/clients');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/clients"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                Client details and history
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/dashboard/clients/${id}/edit`}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <Edit className="h-5 w-5" />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Overview */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">{client.name}</h2>
                      <p className="text-sm text-gray-500">{client.type}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{client.contactPerson}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{client.address}</span>
                </div>
              </div>
              {client.notes && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Notes</h3>
                  <p className="mt-2 text-sm text-gray-500">{client.notes}</p>
                </div>
              )}
            </div>

            {/* Recent Invoices */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Invoices</h3>
                  <Link
                    href="/dashboard/invoices/new"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Create Invoice
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {client.recentInvoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{invoice.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(invoice.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ${invoice.amount.toLocaleString()}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">Financial Summary</h3>
              <dl className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Total Revenue</dt>
                  <dd className="text-sm font-medium text-gray-900">${client.totalRevenue.toLocaleString()}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Outstanding Balance</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${client.recentInvoices
                      .filter(inv => inv.status === 'pending')
                      .reduce((sum, inv) => sum + inv.amount, 0)
                      .toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Last Payment</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${client.recentInvoices
                      .filter(inv => inv.status === 'paid')
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.amount.toLocaleString() || '0'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/dashboard/invoices/new"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create New Invoice
                </Link>
                <button
                  type="button"
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetailPage; 