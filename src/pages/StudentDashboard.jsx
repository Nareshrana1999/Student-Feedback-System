import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardTab from '@/pages/student/DashboardTab';
import FeedbackTab from '@/pages/student/FeedbackTab';
import HistoryTab from '@/pages/student/HistoryTab';
import ProfileTab from '@/pages/student/ProfileTab';
import SettingsTab from '@/pages/student/SettingsTab';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [faculty, setFaculty] = useState([]);
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const { user } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'feedback', label: 'Give Feedback', icon: 'MessageSquare' },
    { id: 'history', label: 'My Feedback', icon: 'BookOpen' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
    const facultyMembers = users.filter(u => u.role === 'faculty');
    setFaculty(facultyMembers);

    const feedbacks = JSON.parse(localStorage.getItem('sfs_feedbacks') || '[]');
    const studentFeedbacks = feedbacks.filter(f => f.studentId === user.id);
    setMyFeedbacks(studentFeedbacks);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab user={user} faculty={faculty} myFeedbacks={myFeedbacks} setActiveTab={setActiveTab} />;
      case 'feedback':
        return <FeedbackTab faculty={faculty} myFeedbacks={myFeedbacks} onFeedbackSubmit={loadData} />;
      case 'history':
        return <HistoryTab faculty={faculty} myFeedbacks={myFeedbacks} setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab user={user} faculty={faculty} myFeedbacks={myFeedbacks} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs}>
      <Helmet>
        <title>Student Dashboard - Student Feedback System</title>
        <meta name="description" content="Student dashboard for submitting faculty feedback, managing profile, and tracking feedback history in the Student Feedback System." />
      </Helmet>
      {renderContent()}
    </Layout>
  );
};

export default StudentDashboard;