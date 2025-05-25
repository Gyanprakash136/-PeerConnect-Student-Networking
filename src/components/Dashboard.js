// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { User, Users, Search, Bell, Settings } from 'lucide-react';
import ProfileForm from './Profileform';
import BrowseStudents from './Browsestudents';
import MyConnections from './Myconnections';
import Toast from './Toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [connections, setConnections] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedConnections = localStorage.getItem('connections');
    const savedRequests = localStorage.getItem('sentRequests');

    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedConnections) setConnections(JSON.parse(savedConnections));
    if (savedRequests) setSentRequests(JSON.parse(savedRequests));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnect = (student) => {
    if (sentRequests.includes(student.id)) {
      showToast('Connection request already sent!', 'info');
      return;
    }

    const newRequests = [...sentRequests, student.id];
    const newConnections = [...connections, student];

    setSentRequests(newRequests);
    setConnections(newConnections);

    localStorage.setItem('sentRequests', JSON.stringify(newRequests));
    localStorage.setItem('connections', JSON.stringify(newConnections));

    showToast(`Connection request sent to ${student.name}!`);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'browse', label: 'Browse Students', icon: Search },
    { id: 'connections', label: 'My Connections', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PeerConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'connections' && connections.length > 0 && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                      {connections.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && (
          <ProfileForm
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            showToast={showToast}
          />
        )}
        {activeTab === 'browse' && (
          <BrowseStudents
            onConnect={handleConnect}
            sentRequests={sentRequests}
            userProfile={userProfile}
          />
        )}
        {activeTab === 'connections' && (
          <MyConnections connections={connections} />
        )}
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Dashboard;
