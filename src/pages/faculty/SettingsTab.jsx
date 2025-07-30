import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const SettingsTab = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        variant: 'destructive',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'New password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }
    // Update password in localStorage for faculty
    const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const loggedInUser = JSON.parse(localStorage.getItem('sfs_logged_in_user') || 'null');
    if (!loggedInUser || loggedInUser.role !== 'faculty') {
      toast({
        title: 'Error',
        description: 'No faculty user is currently logged in.',
        variant: 'destructive',
      });
      return;
    }
    const userIndex = users.findIndex(u => u.id === loggedInUser.id && u.role === 'faculty');
    if (userIndex === -1) {
      toast({
        title: 'Error',
        description: 'User not found.',
        variant: 'destructive',
      });
      return;
    }
    if (users[userIndex].password !== currentPassword) {
      toast({
        title: 'Error',
        description: 'Current password is incorrect.',
        variant: 'destructive',
      });
      return;
    }
    users[userIndex].password = newPassword;
    localStorage.setItem('sfs_users', JSON.stringify(users));
    localStorage.setItem('sfs_logged_in_user', JSON.stringify(users[userIndex]));
    toast({
      title: 'Password Changed',
      description: 'Your password has been updated successfully.',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-300">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-2xl">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" className="bg-white/5 border-white/20 text-white" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" className="bg-white/5 border-white/20 text-white" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" className="bg-white/5 border-white/20 text-white" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <Button onClick={handlePasswordChange} className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;
