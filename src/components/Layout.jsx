
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  Settings,
  Home,
  Users,
  BookOpen,
  MessageSquare,
  BarChart3,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Layout = ({ children, activeTab, onTabChange, tabs }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
  };

  const getPortalName = () => {
    switch (user?.role) {
      case 'admin':
        return 'Admin Portal';
      case 'faculty':
        return 'Faculty Portal';
      case 'student':
        return 'Student Portal';
      default:
        return 'SFS Portal';
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      Home,
      Users,
      BookOpen,
      MessageSquare,
      BarChart3,
      UserCheck,
      GraduationCap,
      User,
      Settings
    };
    const Icon = icons[iconName] || Home;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="sidebar flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-white/10">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold gradient-text">{getPortalName()}</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`nav-link group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600/20 text-blue-300 border-r-2 border-blue-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {getIcon(tab.icon)}
                  <span className="ml-3">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-white/10 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </motion.div>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mobile-menu fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                <div className="flex items-center">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <span className="ml-2 text-xl font-bold gradient-text">{getPortalName()}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="px-2 py-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`nav-link group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600/20 text-blue-300 border-r-2 border-blue-400'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {getIcon(tab.icon)}
                    <span className="ml-3">{tab.label}</span>
                  </button>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <span className="ml-2 text-lg font-bold gradient-text">{getPortalName()}</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
