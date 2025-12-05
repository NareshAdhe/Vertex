import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  Menu,
  X,
  BookOpen,
  Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import AddQuestionForm from '../components/admin/AddQuestionForm';
import AddSubjectForm from '../components/admin/AddSubjectForm';
import AddChapterForm from '../components/admin/AddChapterForm';
import UserManagement from '../components/admin/UserManagement';
import { useAuth } from '../context/AuthContext';
import { authService } from '../utils/authService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('add-question');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'add-question', label: 'Add Question', icon: PlusCircle },
    { id: 'add-subject', label: 'Add Subject', icon: BookOpen },
    { id: 'add-chapter', label: 'Add Chapter', icon: Bookmark },
    { id: 'manage-questions', label: 'Manage Questions', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'add-question':
        return <AddQuestionForm />;
      case 'add-subject':
        return <AddSubjectForm />;
      case 'add-chapter':
        return <AddChapterForm />;
      case 'users':
        return <UserManagement />;
      case 'dashboard':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome to the admin dashboard. Select an option from the sidebar to get started.</p>
            {/* Add stats cards here later */}
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-gray-600">This feature is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        subtitle="Admin Panel" 
        onLogout={handleLogout}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Menu</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="md:hidden p-4 bg-white border-b border-gray-200 flex items-center gap-2">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold text-gray-900">Admin Dashboard</span>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {menuItems.find(i => i.id === activeTab)?.label}
                </h1>
              </div>
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
