import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for team members
const members = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@wonderpaid.com',
    role: 'Admin',
    status: 'active',
    joinedDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@wonderpaid.com',
    role: 'Member',
    status: 'active',
    joinedDate: '2024-01-05',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@wonderpaid.com',
    role: 'Member',
    status: 'pending',
    joinedDate: '2024-01-10',
  },
];

const Members = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
            <p className="text-sm text-muted-foreground">
              Manage your team members and their permissions
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Members List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(member.joinedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
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
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Admin</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Full access to all features</li>
                  <li>• Can manage team members</li>
                  <li>• Can manage billing and subscriptions</li>
                  <li>• Can view and edit organization settings</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Member</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Can view and create invoices</li>
                  <li>• Can process payments</li>
                  <li>• Can view reports</li>
                  <li>• Limited access to settings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Members; 