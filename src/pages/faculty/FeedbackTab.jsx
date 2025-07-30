import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from '@/components/StarRating';

const FeedbackTab = ({ feedbacks }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">My Feedback</h2>
        <p className="text-gray-300">Detailed view of all feedback received from students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="feedback-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Feedback #{index + 1}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={Math.round(feedback.averageRating)} readonly />
                    <span className="text-lg font-bold text-white">{feedback.averageRating.toFixed(1)}</span>
                  </div>
                </div>
                <CardDescription>
                  Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Teaching Quality:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={feedback.ratings?.teachingQuality || 0} readonly size={14} />
                        <span className="text-white">{feedback.ratings?.teachingQuality || 0}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Communication:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={feedback.ratings?.communication || 0} readonly size={14} />
                        <span className="text-white">{feedback.ratings?.communication || 0}</span>
                      </div>
                    </div>
                  </div>
                  {feedback.comment && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Student Comment:</p>
                      <p className="text-white italic">"{feedback.comment}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {feedbacks.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No feedback received yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Your feedback will appear here once students start submitting reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackTab;