import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import StarRating from '@/components/StarRating';

const FeedbackAnalysisTab = ({ users, feedbacks }) => {
  const { toast } = useToast();

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

  const feedbackAnalytics = getFeedbackAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Feedback Analysis</h2>
        <p className="text-gray-300">Comprehensive analysis of faculty performance feedback</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feedbackAnalytics.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="feedback-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{item.faculty?.name || 'Unknown Faculty'}</CardTitle>
                    <CardDescription>{item.faculty?.department} - {item.faculty?.subject}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={Math.round(item.averageRating)} readonly />
                      <span className="text-lg font-bold text-white">{item.averageRating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-gray-400">{item.count} reviews</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Latest Feedback:</span>
                    <span className="text-white">
                      {item.feedbacks.length > 0 
                        ? new Date(item.feedbacks[item.feedbacks.length - 1].createdAt).toLocaleDateString()
                        : 'No feedback yet'
                      }
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Detailed feedback analysis will be available in the next update! 🚀",
                    })}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {feedbackAnalytics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No feedback data available</p>
          <p className="text-gray-500 text-sm mt-2">
            Feedback analysis will appear here once students start submitting feedback
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackAnalysisTab;