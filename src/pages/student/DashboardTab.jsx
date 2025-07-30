import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookOpen, Star, MessageSquare, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/StarRating';

const DashboardTab = ({ user, faculty, myFeedbacks, setActiveTab }) => {
  const getStats = () => {
    const totalFeedbacks = myFeedbacks.length;
    const facultyFeedbackCount = faculty.length;
    const pendingFeedbacks = faculty.length - myFeedbacks.length;
    const averageRating = totalFeedbacks > 0 
      ? myFeedbacks.reduce((sum, f) => sum + f.averageRating, 0) / totalFeedbacks 
      : 0;

    return { totalFeedbacks, facultyFeedbackCount, pendingFeedbacks, averageRating };
  };

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Student Dashboard</h2>
        <p className="text-gray-300">Welcome back, {user.name}! Track your feedback submissions and manage your profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Feedback Given', value: stats.totalFeedbacks, icon: CheckCircle, color: 'from-green-500 to-emerald-600', description: 'Total feedback submitted' },
          { title: 'Pending Feedback', value: stats.pendingFeedbacks, icon: Clock, color: 'from-orange-500 to-red-600', description: 'Faculty awaiting feedback' },
          { title: 'Faculty Members', value: stats.facultyFeedbackCount, icon: BookOpen, color: 'from-blue-500 to-cyan-600', description: 'Total faculty in system' },
          { title: 'Average Rating', value: stats.averageRating.toFixed(1), icon: Star, color: 'from-purple-500 to-pink-600', description: 'Your average rating given' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-white">Recent Feedback</CardTitle>
          <CardDescription>Your latest feedback submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myFeedbacks.slice(-3).reverse().map((feedback, index) => {
              const facultyMember = faculty.find(f => f.id === feedback.facultyId);
              return (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-white">{facultyMember?.name || 'Unknown Faculty'}</p>
                      <p className="text-sm text-gray-400">{facultyMember?.department}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={Math.round(feedback.averageRating)} readonly size={16} />
                      <span className="text-white font-medium">{feedback.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
            {myFeedbacks.length === 0 && (
              <p className="text-center text-gray-400 py-8">No feedback submitted yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;