import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const SettingsTab = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">System Settings</h2>
        <p className="text-gray-300">Configure system preferences and contact information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
            <CardDescription>Update system contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="college-name">College Name</Label>
              <Input
                id="college-name"
                defaultValue="ABC College of Engineering"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                defaultValue="admin@college.edu"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                defaultValue="+1 (555) 123-4567"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "Contact information updates will be available in the next update! 🚀",
              })}
            >
              Update Contact Info
            </Button>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">System Preferences</CardTitle>
            <CardDescription>Configure system behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="feedback-frequency">Feedback Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input
                id="notification-email"
                defaultValue="notifications@college.edu"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "System preferences will be configurable in the next update! 🚀",
              })}
            >
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;