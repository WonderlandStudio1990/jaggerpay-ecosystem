import React from 'react';
import { Plus, Search, Filter, User, Mail, Phone, Building } from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock data for clients
const clients = [
  {
    id: 'CLIENT-001',
    name: 'Acme Studios',
    contactPerson: 'John Doe',
    email: 'john@acmestudios.com',
    phone: '+1 (555) 123-4567',
    address: '123 Studio Ave, Los Angeles, CA 90028',
    type: 'Studio',
    status: 'active',
    totalRevenue: 15000.00,
  },
  {
    id: 'CLIENT-002',
    name: 'Melody Productions',
    contactPerson: 'Jane Smith',
    email: 'jane@melodyproductions.com',
    phone: '+1 (555) 234-5678',
    address: '456 Music Lane, Nashville, TN 37203',
    type: 'Production Company',
    status: 'active',
    totalRevenue: 25000.00,
  },
  {
    id: 'CLIENT-003',
    name: 'Rhythm Records',
    contactPerson: 'Mike Johnson',
    email: 'mike@rhythmrecords.com',
    phone: '+1 (555) 345-6789',
    address: '789 Beat Street, New York, NY 10013',
    type: 'Record Label',
    status: 'inactive',
    totalRevenue: 8000.00,
  },
];

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

  const getTotalRevenue = () => {
    return filteredClients.reduce((sum, client) => sum + client.totalRevenue, 0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your client relationships
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Client
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Clients</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {filteredClients.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Clients</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">
              {filteredClients.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              ${getTotalRevenue().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              href={`/dashboard/clients/${client.id}`}
              className="block hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {client.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{client.contactPerson}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex flex-col space-y-2 text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Phone className="h-4 w-4" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage; 