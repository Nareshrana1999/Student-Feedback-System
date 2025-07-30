
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import FacultyDashboard from '@/pages/FacultyDashboard';
import StudentDashboard from '@/pages/StudentDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />} 
      />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/faculty/*" 
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/*" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Helmet>
            <title>Student Feedback System - College Management</title>
            <meta name="description" content="Comprehensive student feedback system for rating and analyzing college faculty performance with secure authentication and detailed analytics." />
          </Helmet>
          <AppRoutes />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
