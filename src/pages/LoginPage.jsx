import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { GraduationCap, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage faculty, students, and system settings',
      icon: '👨‍💼',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-500/10 to-pink-600/10',
      borderColor: 'border-red-500/30'
    },
    {
      id: 'faculty',
      title: 'Faculty Member',
      description: 'View feedback and manage your profile',
      icon: '👨‍🏫',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-600/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Submit feedback and manage your profile',
      icon: '👨‍🎓',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      borderColor: 'border-green-500/30'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCredentials({ email: '', password: '' });
    
    if (role.id === 'admin') {
      setCredentials({ email: 'admin@college.edu', password: 'admin123' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem('sfs_users') || '[]');
      
      if (users.length === 0) {
        const defaultUsers = [
          // Admin
          {
            id: 1,
            email: 'admin@college.edu',
            password: 'admin123',
            role: 'admin',
            name: 'System Administrator',
            phone: '+1234567890',
            department: 'Administration'
          },
          // Faculty (5)
          {
            id: 2,
            email: 'john.faculty@college.edu',
            password: '123456',
            role: 'faculty',
            name: 'Dr. John Smith',
            phone: '+1234567891',
            department: 'Computer Science',
            subject: 'Data Structures'
          },
          {
            id: 3,
            email: 'emma.faculty@college.edu',
            password: '123456',
            role: 'faculty',
            name: 'Dr. Emma Brown',
            phone: '+1234567893',
            department: 'Mathematics',
            subject: 'Calculus'
          },
          {
            id: 4,
            email: 'li.faculty@college.edu',
            password: '123456',
            role: 'faculty',
            name: 'Dr. Li Wang',
            phone: '+1234567894',
            department: 'Physics',
            subject: 'Quantum Mechanics'
          },
          {
            id: 5,
            email: 'maria.faculty@college.edu',
            password: '123456',
            role: 'faculty',
            name: 'Dr. Maria Garcia',
            phone: '+1234567895',
            department: 'Chemistry',
            subject: 'Organic Chemistry'
          },
          {
            id: 6,
            email: 'david.faculty@college.edu',
            password: '123456',
            role: 'faculty',
            name: 'Dr. David Miller',
            phone: '+1234567896',
            department: 'English',
            subject: 'Literature'
          },
          // Students (25)
          // 25 students with real names and emails
          {
            id: 7, name: 'Ava Patel', email: 'ava.patel@college.edu', password: '123456', role: 'student', phone: '+12345679100', department: 'Computer Science', rollNumber: 'CS2021001' },
          { id: 8, name: 'Liam Johnson', email: 'liam.johnson@college.edu', password: '123456', role: 'student', phone: '+12345679101', department: 'Mathematics', rollNumber: 'CS2021002' },
          { id: 9, name: 'Sophia Lee', email: 'sophia.lee@college.edu', password: '123456', role: 'student', phone: '+12345679102', department: 'Physics', rollNumber: 'CS2021003' },
          { id: 10, name: 'Noah Kim', email: 'noah.kim@college.edu', password: '123456', role: 'student', phone: '+12345679103', department: 'Chemistry', rollNumber: 'CS2021004' },
          { id: 11, name: 'Mia Chen', email: 'mia.chen@college.edu', password: '123456', role: 'student', phone: '+12345679104', department: 'English', rollNumber: 'CS2021005' },
          { id: 12, name: 'Ethan Brown', email: 'ethan.brown@college.edu', password: '123456', role: 'student', phone: '+12345679105', department: 'Computer Science', rollNumber: 'CS2021006' },
          { id: 13, name: 'Isabella Garcia', email: 'isabella.garcia@college.edu', password: '123456', role: 'student', phone: '+12345679106', department: 'Mathematics', rollNumber: 'CS2021007' },
          { id: 14, name: 'Mason Martinez', email: 'mason.martinez@college.edu', password: '123456', role: 'student', phone: '+12345679107', department: 'Physics', rollNumber: 'CS2021008' },
          { id: 15, name: 'Charlotte Davis', email: 'charlotte.davis@college.edu', password: '123456', role: 'student', phone: '+12345679108', department: 'Chemistry', rollNumber: 'CS2021009' },
          { id: 16, name: 'Logan Wilson', email: 'logan.wilson@college.edu', password: '123456', role: 'student', phone: '+12345679109', department: 'English', rollNumber: 'CS2021010' },
          { id: 17, name: 'Amelia Anderson', email: 'amelia.anderson@college.edu', password: '123456', role: 'student', phone: '+12345679110', department: 'Computer Science', rollNumber: 'CS2021011' },
          { id: 18, name: 'Elijah Thomas', email: 'elijah.thomas@college.edu', password: '123456', role: 'student', phone: '+12345679111', department: 'Mathematics', rollNumber: 'CS2021012' },
          { id: 19, name: 'Harper Moore', email: 'harper.moore@college.edu', password: '123456', role: 'student', phone: '+12345679112', department: 'Physics', rollNumber: 'CS2021013' },
          { id: 20, name: 'Benjamin Taylor', email: 'benjamin.taylor@college.edu', password: '123456', role: 'student', phone: '+12345679113', department: 'Chemistry', rollNumber: 'CS2021014' },
          { id: 21, name: 'Evelyn Jackson', email: 'evelyn.jackson@college.edu', password: '123456', role: 'student', phone: '+12345679114', department: 'English', rollNumber: 'CS2021015' },
          { id: 22, name: 'James White', email: 'james.white@college.edu', password: '123456', role: 'student', phone: '+12345679115', department: 'Computer Science', rollNumber: 'CS2021016' },
          { id: 23, name: 'Abigail Harris', email: 'abigail.harris@college.edu', password: '123456', role: 'student', phone: '+12345679116', department: 'Mathematics', rollNumber: 'CS2021017' },
          { id: 24, name: 'Lucas Clark', email: 'lucas.clark@college.edu', password: '123456', role: 'student', phone: '+12345679117', department: 'Physics', rollNumber: 'CS2021018' },
          { id: 25, name: 'Ella Lewis', email: 'ella.lewis@college.edu', password: '123456', role: 'student', phone: '+12345679118', department: 'Chemistry', rollNumber: 'CS2021019' },
          { id: 26, name: 'Henry Young', email: 'henry.young@college.edu', password: '123456', role: 'student', phone: '+12345679119', department: 'English', rollNumber: 'CS2021020' },
          { id: 27, name: 'Scarlett King', email: 'scarlett.king@college.edu', password: '123456', role: 'student', phone: '+12345679120', department: 'Computer Science', rollNumber: 'CS2021021' },
          { id: 28, name: 'Jack Wright', email: 'jack.wright@college.edu', password: '123456', role: 'student', phone: '+12345679121', department: 'Mathematics', rollNumber: 'CS2021022' },
          { id: 29, name: 'Grace Lopez', email: 'grace.lopez@college.edu', password: '123456', role: 'student', phone: '+12345679122', department: 'Physics', rollNumber: 'CS2021023' },
          { id: 30, name: 'Alexander Hill', email: 'alexander.hill@college.edu', password: '123456', role: 'student', phone: '+12345679123', department: 'Chemistry', rollNumber: 'CS2021024' },
          { id: 31, name: 'Chloe Scott', email: 'chloe.scott@college.edu', password: '123456', role: 'student', phone: '+12345679124', department: 'English', rollNumber: 'CS2021025' }
        ];
        localStorage.setItem('sfs_users', JSON.stringify(defaultUsers));
      }

      const allUsers = JSON.parse(localStorage.getItem('sfs_users') || '[]');
      const user = allUsers.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password && 
        u.role === selectedRole.id
      );

      if (user) {
        localStorage.setItem('sfs_logged_in_user', JSON.stringify(user));
        login(user);
        toast({
          title: "Login successful!",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        let updateMsg = '';
        if (selectedRole.id === 'faculty' || selectedRole.id === 'student') {
          updateMsg = ' If you recently changed your password, please use your updated password or use the update password option.';
        }
        toast({
          title: "Login failed",
          description: `Invalid credentials or role mismatch.${updateMsg}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      <Helmet>
        <title>Login - Student Feedback System</title>
        <meta name="description" content="Secure login portal for administrators, faculty members, and students to access the Student Feedback System." />
      </Helmet>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center pulse-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold gradient-text mb-4">
            Student Feedback System
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure portal for faculty performance evaluation and feedback management
          </p>
        </motion.div>

        {!selectedRole ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-center text-white mb-8">
              Select Your Role
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className={`role-card cursor-pointer h-full bg-gradient-to-br ${role.bgGradient} border ${role.borderColor} hover:shadow-2xl transition-all duration-300`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="text-4xl mb-4">{role.icon}</div>
                      <CardTitle className={`text-xl bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent`}>
                        {role.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-300">
                        {role.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="glass-effect border-white/20">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{selectedRole.icon}</div>
                <CardTitle className={`text-2xl bg-gradient-to-r ${selectedRole.gradient} bg-clip-text text-transparent`}>
                  {selectedRole.title} Login
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your credentials to access the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className={`w-full bg-gradient-to-r ${selectedRole.gradient} hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105`}
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSelectedRole(null)}
                      className="w-full text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      Back to Role Selection
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;