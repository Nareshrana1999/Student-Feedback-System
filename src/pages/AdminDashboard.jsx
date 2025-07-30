import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import DashboardTab from '@/pages/admin/DashboardTab';
import UserManagementTab from '@/pages/admin/UserManagementTab';
import FeedbackAnalysisTab from '@/pages/admin/FeedbackAnalysisTab';
import SettingsTab from '@/pages/admin/SettingsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'faculty', label: 'Faculty Management', icon: 'Users' },
    { id: 'students', label: 'Student Management', icon: 'GraduationCap' },
    { id: 'feedback', label: 'Feedback Analysis', icon: 'MessageSquare' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedUsers = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const storedFeedbacks = JSON.parse(localStorage.getItem('sfs_feedbacks') || '[]');
    setUsers(storedUsers);
    setFeedbacks(storedFeedbacks);
  };

  const reloadData = () => {
    loadData();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab users={users} feedbacks={feedbacks} />;
      case 'faculty':
        return <UserManagementTab role="faculty" users={users} onDataChange={reloadData} />;
      case 'students':
        return <UserManagementTab role="student" users={users} onDataChange={reloadData} />;
      case 'feedback':
        return <FeedbackAnalysisTab users={users} feedbacks={feedbacks} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab users={users} feedbacks={feedbacks} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs}>
      <Helmet>
        <title>Admin Dashboard - Student Feedback System</title>
        <meta name="description" content="Administrative dashboard for managing faculty, students, and analyzing feedback data in the Student Feedback System." />
      </Helmet>
      {renderContent()}
    </Layout>
  );
};

export default AdminDashboard;