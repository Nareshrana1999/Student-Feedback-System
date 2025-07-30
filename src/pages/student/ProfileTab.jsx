import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProfileTab = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfileData(user);
  }, [user]);

  const handleProfileUpdate = () => {
    const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...profileData } : u
    );
    localStorage.setItem('sfs_users', JSON.stringify(updatedUsers));
    updateUser(profileData);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
          <p className="text-gray-300">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profileData.name || ''} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} disabled={!isEditing} className="bg-white/5 border-white/20 text-white disabled:opacity-60" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={profileData.email || ''} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} disabled={!isEditing} className="bg-white/5 border-white/20 text-white disabled:opacity-60" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profileData.phone || ''} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} disabled={!isEditing} className="bg-white/5 border-white/20 text-white disabled:opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Academic Information</CardTitle>
            <CardDescription>Your academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input id="rollNumber" value={profileData.rollNumber || ''} onChange={(e) => setProfileData({ ...profileData, rollNumber: e.target.value })} disabled={!isEditing} className="bg-white/5 border-white/20 text-white disabled:opacity-60" />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={profileData.department || ''} onChange={(e) => setProfileData({ ...profileData, department: e.target.value })} disabled={!isEditing} className="bg-white/5 border-white/20 text-white disabled:opacity-60" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value="Student" disabled className="bg-white/5 border-white/20 text-white opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <Button variant="ghost" onClick={() => { setIsEditing(false); setProfileData(user); }} className="text-gray-300 hover:text-white">Cancel</Button>
          <Button onClick={handleProfileUpdate} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90">Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;