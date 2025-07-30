import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/StarRating';

const HistoryTab = ({ faculty, myFeedbacks, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">My Feedback History</h2>
        <p className="text-gray-300">View all the feedback you have submitted</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myFeedbacks.map((feedback, index) => {
          const facultyMember = faculty.find(f => f.id === feedback.facultyId);
          return (
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
                      <CardTitle className="text-white">{facultyMember?.name || 'Unknown Faculty'}</CardTitle>
                      <CardDescription>{facultyMember?.department} - {facultyMember?.subject}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={Math.round(feedback.averageRating)} readonly />
                      <span className="text-lg font-bold text-white">{feedback.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
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
                    <div className="text-sm text-gray-400">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                    {feedback.comment && (
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Your Comment:</p>
                        <p className="text-white italic">"{feedback.comment}"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {myFeedbacks.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No feedback submitted yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Your feedback history will appear here once you start submitting reviews
          </p>
          <Button onClick={() => setActiveTab('feedback')} className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
            Give Your First Feedback
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;