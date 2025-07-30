import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from '@/components/StarRating';

const DashboardTab = ({ users, feedbacks }) => {
  const getStats = () => {
    const facultyCount = users.filter(u => u.role === 'faculty').length;
    const studentCount = users.filter(u => u.role === 'student').length;
    const feedbackCount = feedbacks.length;
    const avgRating = feedbacks.length > 0 
      ? feedbacks.reduce((sum, f) => sum + f.averageRating, 0) / feedbacks.length 
      : 0;

    return { facultyCount, studentCount, feedbackCount, avgRating };
  };

  const getFeedbackAnalytics = () => {
    const facultyFeedbacks = {};
    
    feedbacks.forEach(feedback => {
      if (!facultyFeedbacks[feedback.facultyId]) {
        const facultyMember = users.find(u => u.id === feedback.facultyId);
        if (facultyMember) {
          facultyFeedbacks[feedback.facultyId] = {
            faculty: facultyMember,
            feedbacks: [],
            totalRating: 0,
            count: 0
          };
        }
      }
      
      if (facultyFeedbacks[feedback.facultyId]) {
        facultyFeedbacks[feedback.facultyId].feedbacks.push(feedback);
        facultyFeedbacks[feedback.facultyId].totalRating += feedback.averageRating;
        facultyFeedbacks[feedback.facultyId].count += 1;
      }
    });

    return Object.values(facultyFeedbacks).map(item => ({
      ...item,
      averageRating: item.count > 0 ? item.totalRating / item.count : 0
    }));
  };

  const stats = getStats();
  const feedbackAnalytics = getFeedbackAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
        <p className="text-gray-300">Overview of system statistics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Faculty', value: stats.facultyCount, icon: Users, color: 'from-blue-500 to-cyan-600' },
          { title: 'Total Students', value: stats.studentCount, icon: BookOpen, color: 'from-green-500 to-emerald-600' },
          { title: 'Total Feedback', value: stats.feedbackCount, icon: BarChart3, color: 'from-purple-500 to-pink-600' },
          { title: 'Average Rating', value: stats.avgRating.toFixed(1), icon: Users, color: 'from-orange-500 to-red-600' }
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
          <CardTitle className="text-white">Recent Feedback Summary</CardTitle>
          <CardDescription>Latest faculty performance ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackAnalytics.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium text-white">{item.faculty?.name || 'Unknown Faculty'}</p>
                  <p className="text-sm text-gray-400">{item.faculty?.department}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <StarRating rating={Math.round(item.averageRating)} readonly size={16} />
                  <span className="text-sm text-gray-300">{item.count} reviews</span>
                </div>
              </div>
            ))}
            {feedbackAnalytics.length === 0 && (
              <p className="text-center text-gray-400 py-8">No feedback data available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;