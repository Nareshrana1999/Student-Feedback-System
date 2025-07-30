import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardTab from '@/pages/faculty/DashboardTab';
import FeedbackTab from '@/pages/faculty/FeedbackTab';
import ProfileTab from '@/pages/faculty/ProfileTab';
import SettingsTab from '@/pages/faculty/SettingsTab';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'feedback', label: 'My Feedback', icon: 'MessageSquare' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    loadFeedbacks();
  }, [user]);

  const loadFeedbacks = () => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('sfs_feedbacks') || '[]');
    const myFeedbacks = storedFeedbacks.filter(f => f.facultyId === user.id);
    setFeedbacks(myFeedbacks);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab user={user} feedbacks={feedbacks} />;
      case 'feedback':
        return <FeedbackTab feedbacks={feedbacks} />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab user={user} feedbacks={feedbacks} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs}>
      <Helmet>
        <title>Faculty Dashboard - Student Feedback System</title>
        <meta name="description" content="Faculty dashboard for viewing student feedback, managing profile, and analyzing teaching performance in the Student Feedback System." />
      </Helmet>
      {renderContent()}
    </Layout>
  );
};

export default FacultyDashboard;