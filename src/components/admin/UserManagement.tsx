import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit } from 'lucide-react';
import { User } from '@/types';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mcqueen.com',
    fullName: 'Administrador',
    isAdmin: true,
    lastLogin: '2023-04-20T08:15:00.000Z',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    username: 'joao.silva',
    email: 'joao.silva@mcqueen.com',
    fullName: 'João Silva',
    isAdmin: false,
    lastLogin: '2023-04-19T14:30:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
  },
  {
    id: '3',
    username: 'maria.santos',
    email: 'maria.santos@mcqueen.com',
    fullName: 'Maria Santos',
    isAdmin: false,
    lastLogin: '2023-04-20T09:45:00.000Z',
    createdAt: '2023-02-01T00:00:00.000Z',
  },
  {
    id: '4',
    username: 'pedro.oliveira',
    email: 'pedro.oliveira@mcqueen.com',
    fullName: 'Pedro Oliveira',
    isAdmin: false,
    lastLogin: '2023-04-18T11:20:00.000Z',
    createdAt: '2023-02-15T00:00:00.000Z',
  },
  {
    id: '5',
    username: 'ana.rodrigues',
    email: 'ana.rodrigues@mcqueen.com',
    fullName: 'Ana Rodrigues',
    isAdmin: false,
    lastLogin: '2023-04-19T16:05:00.000Z',
    createdAt: '2023-03-01T00:00:00.000Z',
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleMakeAdmin = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: 'Error',
        description: 'Select at least one user.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Profiles updated',
      description: `${selectedUsers.length} user(s) are now administrators.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-gray-600">View and manage system users</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={handleMakeAdmin} disabled={selectedUsers.length === 0}>
            Make Admin
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New User
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox 
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} 
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Access</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)} 
                      onCheckedChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.lastLogin)}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <Badge className="bg-mcqueen-100 text-mcqueen-800">Admin</Badge>
                    ) : (
                      <Badge variant="outline">User</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
