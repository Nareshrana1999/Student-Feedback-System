import { motion } from 'framer-motion';
import { MessageSquare, Star, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from '@/components/StarRating';

const DashboardTab = ({ user, feedbacks }) => {
  // Defensive: fallback to empty array and object
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const safeUser = user || { name: 'Faculty' };

  const getStats = () => {
    const totalFeedbacks = safeFeedbacks.length;
    const averageRating = totalFeedbacks > 0 && safeFeedbacks.every(f => typeof f.averageRating === 'number')
      ? safeFeedbacks.reduce((sum, f) => sum + (typeof f.averageRating === 'number' ? f.averageRating : 0), 0) / totalFeedbacks
      : 0;

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthlyFeedbacks = safeFeedbacks.filter(f => {
      if (!f.createdAt) return false;
      const feedbackDate = new Date(f.createdAt);
      return feedbackDate.getMonth() === thisMonth && feedbackDate.getFullYear() === thisYear;
    }).length;

    // Unique students reached (by studentId)
    const studentIds = new Set();
    safeFeedbacks.forEach(f => {
      if (f.studentId) studentIds.add(f.studentId);
    });
    const studentsReached = studentIds.size;

    const ratingDistribution = [0, 0, 0, 0, 0];
    safeFeedbacks.forEach(f => {
      const rating = Math.round(typeof f.averageRating === 'number' ? f.averageRating : 0);
      if (rating >= 1 && rating <= 5) {
        ratingDistribution[rating - 1]++;
      }
    });

    return { totalFeedbacks, averageRating, monthlyFeedbacks, ratingDistribution, studentsReached };
  };

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Faculty Dashboard</h2>
        <p className="text-gray-300">Welcome back, {safeUser.name}! Here's your performance overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Feedback', value: stats.totalFeedbacks, icon: MessageSquare, color: 'from-blue-500 to-cyan-600', description: 'Total reviews received' },
          { title: 'Average Rating', value: isNaN(stats.averageRating) ? '0.0' : stats.averageRating.toFixed(1), icon: Star, color: 'from-yellow-500 to-orange-600', description: 'Overall performance rating' },
          { title: 'This Month', value: stats.monthlyFeedbacks, icon: Calendar, color: 'from-green-500 to-emerald-600', description: 'Feedback this month' },
          { title: 'Students Reached', value: stats.studentsReached, icon: Users, color: 'from-purple-500 to-pink-600', description: 'Unique students who provided feedback' }
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
          <CardDescription>Latest feedback from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeFeedbacks.slice(-5).reverse().map((feedback, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={Math.round(typeof feedback.averageRating === 'number' ? feedback.averageRating : 0)} readonly size={16} />
                  <span className="text-sm text-gray-400">
                    {feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  Average Rating: {typeof feedback.averageRating === 'number' ? feedback.averageRating.toFixed(1) : '0.0'}/5.0
                </p>
                {feedback.comment && (
                  <p className="text-sm text-gray-400 mt-2 italic">"{feedback.comment}"</p>
                )}
              </div>
            ))}
            {safeFeedbacks.length === 0 && (
              <p className="text-center text-gray-400 py-8">No feedback received yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
