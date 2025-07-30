import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const UserFormDialog = ({ isOpen, setIsOpen, editingUser, onDataChange, role }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: role,
    phone: '',
    department: '',
    rollNumber: '',
    subject: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editingUser) {
      setFormData({ ...editingUser, password: '' });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: role,
        phone: '',
        department: '',
        rollNumber: '',
        subject: ''
      });
    }
  }, [editingUser, isOpen, role]);

  const handleSave = () => {
    if (!formData.name || !formData.email || (!editingUser && !formData.password)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    
    if (editingUser) {
      const updatedUsers = existingUsers.map(u => 
        u.id === editingUser.id ? { ...u, ...formData, password: formData.password || u.password } : u
      );
      localStorage.setItem('sfs_users', JSON.stringify(updatedUsers));
      toast({
        title: "User Updated Successfully",
        description: `${formData.name}'s information has been updated.`,
      });
    } else {
      if (existingUsers.find(u => u.email === formData.email)) {
        toast({
          title: "Email Already Exists",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return;
      }
      const newUser = { ...formData, id: Date.now() };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('sfs_users', JSON.stringify(updatedUsers));
      toast({
        title: "User Added Successfully",
        description: `${formData.name} has been added to the system.`,
      });
    }
    
    onDataChange();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingUser ? 'Edit' : 'Add'} {role === 'faculty' ? 'Faculty Member' : 'Student'}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {editingUser ? 'Update' : 'Enter'} the user's information below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter email address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder={editingUser ? "Leave blank to keep current" : "Enter password"} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter department" />
          </div>
          {role === 'faculty' && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter subject" />
            </div>
          )}
          {role === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input id="rollNumber" value={formData.rollNumber} onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} className="bg-white/5 border-white/20 text-white" placeholder="Enter roll number" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Cancel</Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
            {editingUser ? 'Update' : 'Add'} User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;