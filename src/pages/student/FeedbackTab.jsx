import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import StarRating from '@/components/StarRating';

const feedbackQuestions = [
  { key: 'teachingQuality', label: 'Teaching Quality', description: 'How would you rate the overall teaching quality?' },
  { key: 'communication', label: 'Communication Skills', description: 'How clear and effective is the communication?' },
  { key: 'courseContent', label: 'Course Content', description: 'How relevant and well-structured is the course content?' },
  { key: 'availability', label: 'Availability', description: 'How accessible is the faculty for doubts and queries?' },
  { key: 'punctuality', label: 'Punctuality', description: 'How punctual is the faculty for classes and meetings?' },
  { key: 'knowledgeLevel', label: 'Subject Knowledge', description: 'How deep is the faculty\'s knowledge of the subject?' },
  { key: 'classroomManagement', label: 'Classroom Management', description: 'How well does the faculty manage the classroom environment?' },
  { key: 'assignmentFeedback', label: 'Assignment Feedback', description: 'How helpful is the feedback on assignments and tests?' },
  { key: 'motivation', label: 'Student Motivation', description: 'How well does the faculty motivate students to learn?' },
  { key: 'overallSatisfaction', label: 'Overall Satisfaction', description: 'Your overall satisfaction with this faculty member?' }
];

const FeedbackTab = ({ faculty, myFeedbacks, onFeedbackSubmit }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    teachingQuality: 0, communication: 0, courseContent: 0, availability: 0, punctuality: 0,
    knowledgeLevel: 0, classroomManagement: 0, assignmentFeedback: 0, motivation: 0, overallSatisfaction: 0,
    comment: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRatingChange = (question, rating) => {
    setFeedbackForm(prev => ({ ...prev, [question]: rating }));
  };

  const calculateAverageRating = () => {
    const ratings = Object.values(feedbackForm).filter((value, index) => 
      index < feedbackQuestions.length && typeof value === 'number' && value > 0
    );
    return ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
  };

  const handleSubmitFeedback = () => {
    if (!selectedFaculty) {
      toast({ title: "Please select a faculty member", variant: "destructive" });
      return;
    }
    if (feedbackQuestions.some(q => feedbackForm[q.key] === 0)) {
      toast({ title: "Please rate all questions", variant: "destructive" });
      return;
    }

    const existingFeedbacks = JSON.parse(localStorage.getItem('sfs_feedbacks') || '[]');
    if (existingFeedbacks.find(f => f.studentId === user.id && f.facultyId === selectedFaculty.id)) {
      toast({ title: "Feedback Already Submitted", variant: "destructive" });
      return;
    }

    const feedback = {
      id: Date.now(), studentId: user.id, facultyId: selectedFaculty.id,
      ratings: { ...feedbackForm }, averageRating: calculateAverageRating(),
      comment: feedbackForm.comment, createdAt: new Date().toISOString()
    };
    delete feedback.ratings.comment;

    const updatedFeedbacks = [...existingFeedbacks, feedback];
    localStorage.setItem('sfs_feedbacks', JSON.stringify(updatedFeedbacks));
    
    setFeedbackForm({
      teachingQuality: 0, communication: 0, courseContent: 0, availability: 0, punctuality: 0,
      knowledgeLevel: 0, classroomManagement: 0, assignmentFeedback: 0, motivation: 0, overallSatisfaction: 0,
      comment: ''
    });
    setSelectedFaculty(null);
    onFeedbackSubmit();
    toast({ title: "Feedback Submitted Successfully!" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Give Feedback</h2>
        <p className="text-gray-300">Select a faculty member and provide your honest feedback</p>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-white">Select Faculty Member</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedFaculty?.id?.toString() || ''} 
            onValueChange={(value) => setSelectedFaculty(faculty.find(f => f.id.toString() === value))}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select a faculty member" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {faculty.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()} disabled={myFeedbacks.some(f => f.facultyId === member.id)}>
                  <div className="flex items-center justify-between w-full">
                    <span>{member.name} - {member.department}</span>
                    {myFeedbacks.some(f => f.facultyId === member.id) && <span className="text-green-400 text-xs ml-2">✓ Rated</span>}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedFaculty && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white">Feedback for {selectedFaculty.name}</CardTitle>
            <CardDescription>{selectedFaculty.department} - {selectedFaculty.subject}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              {feedbackQuestions.map((question, index) => (
                <motion.div key={question.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{question.label}</h4>
                      <p className="text-sm text-gray-400">{question.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={feedbackForm[question.key]} onRatingChange={(rating) => handleRatingChange(question.key, rating)} size={24} />
                      <span className="text-white font-medium w-8">{feedbackForm[question.key] || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-white">Additional Comments (Optional)</Label>
              <Textarea id="comment" placeholder="Share any additional thoughts or suggestions..." value={feedbackForm.comment} onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })} className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]" />
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Overall Rating:</span>
                <div className="flex items-center space-x-2">
                  <StarRating rating={Math.round(calculateAverageRating())} readonly size={20} />
                  <span className="text-xl font-bold text-white">{calculateAverageRating().toFixed(1)}</span>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmitFeedback} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 h-12" disabled={calculateAverageRating() === 0}>
              <Send className="w-5 h-5 mr-2" /> Submit Feedback
            </Button>
          </CardContent>
        </Card>
      )}

      {faculty.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No faculty members available</p>
          <p className="text-gray-500 text-sm mt-2">Faculty members will appear here once they are added to the system</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackTab;