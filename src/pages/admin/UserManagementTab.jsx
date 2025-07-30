import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import UserFormDialog from '@/pages/admin/UserFormDialog';

const UserManagementTab = ({ role, users, onDataChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState(role);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { toast } = useToast();

  const handleAddClick = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId) => {
    const existingUsers = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const updatedUsers = existingUsers.filter(u => u.id !== userId);
    localStorage.setItem('sfs_users', JSON.stringify(updatedUsers));
    onDataChange();
    toast({
      title: "User Deleted",
      description: "User has been removed from the system.",
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole && user.role !== 'admin';
    });
  }, [users, searchTerm, filterRole]);

  const currentRoleUsers = filteredUsers.filter(user => user.role === role);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {role === 'faculty' ? 'Faculty' : 'Student'} Management
          </h2>
          <p className="text-gray-300">
            Manage {role === 'faculty' ? 'faculty members' : 'students'} and their information
          </p>
        </div>
        <Button onClick={handleAddClick} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add {role === 'faculty' ? 'Faculty' : 'Student'}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        {role === 'all' && (
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
              <SelectItem value="student">Students</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRoleUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="dashboard-card hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-semibold text-white text-lg truncate">{user.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium self-start ${
                    user.role === 'faculty' 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {user.role}
                  </div>
                </div>
                <div className="space-y-1 flex-grow">
                  <p className="text-sm text-gray-400 truncate">{user.department}</p>
                  {user.role === 'faculty' && user.subject && (
                    <p className="text-sm text-blue-300 truncate">Subject: {user.subject}</p>
                  )}
                  {user.role === 'student' && user.rollNumber && (
                    <p className="text-sm text-green-300 truncate">Roll: {user.rollNumber}</p>
                  )}
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditClick(user)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {currentRoleUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No {role === 'faculty' ? 'faculty members' : 'students'} found</p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm ? 'Try adjusting your search criteria' : `Add your first ${role} to get started`}
          </p>
        </div>
      )}

      <UserFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingUser={editingUser}
        onDataChange={onDataChange}
        role={role}
      />
    </div>
  );
};

export default UserManagementTab;