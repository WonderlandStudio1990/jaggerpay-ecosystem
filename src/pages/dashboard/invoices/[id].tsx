import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Download, Send, Edit, Trash, FileText, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock invoice data
const invoice = {
  id: 'INV-001',
  client: 'Acme Studios',
  amount: 3500.00,
  dueDate: '2024-03-15',
  status: 'paid',
  category: 'Studio Time',
  description: 'Recording session - March 2024',
  items: [
    {
      description: 'Studio Time (4 hours)',
      quantity: 4,
      rate: 500,
    },
    {
      description: 'Sound Engineer',
      quantity: 1,
      rate: 1000,
    },
    {
      description: 'Equipment Setup',
      quantity: 1,
      rate: 500,
    },
  ],
  notes: 'Payment due within 30 days. Please include invoice number in payment reference.',
  createdAt: '2024-02-15',
};

const InvoiceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const getStatusColor = (status: string) => {
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

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      // Mock deletion - will be connected to backend later
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/invoices');
    }
  };

  const handleSendInvoice = async () => {
    // Mock sending - will be connected to backend later
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Invoice sent successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/invoices"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Invoice {invoice.id}</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage invoice details
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSendInvoice}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Invoice
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <div className="flex items-center space-x-2">
              <Link
                href={`/dashboard/invoices/${id}/edit`}
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
        </div>

        {/* Invoice Details */}
        <div className="bg-white shadow-sm rounded-lg">
          {/* Status Bar */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{invoice.client}</h2>
                  <p className="text-sm text-gray-500">{invoice.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Due {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900">
                      ${invoice.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="px-6 py-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      <div className="text-sm text-gray-900">{item.description}</div>
                    </td>
                    <td className="py-4 text-right text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="py-4 text-right text-sm text-gray-500">
                      ${item.rate.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-sm font-medium text-gray-900">
                      ${(item.quantity * item.rate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={3} className="pt-6 text-right text-sm font-medium text-gray-900">
                    Total
                  </th>
                  <td className="pt-6 text-right text-sm font-medium text-gray-900">
                    ${calculateSubtotal().toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900">Notes</h3>
              <p className="mt-2 text-sm text-gray-500">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
            <div className="text-xs text-gray-500">
              Created on {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetailPage; 