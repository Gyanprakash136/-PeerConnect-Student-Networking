// src/components/dashboard/EnhancedDashboard.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Users, Search, Trophy, Code, LogOut,
  Bell, Settings, Zap, Target, TrendingUp, MessageCircle,
  UserPlus, Calendar, ExternalLink, Video, Wifi
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import ProfileForm from './ProfileForm';
import BrowseStudents from './BrowseStudents';
import MyConnections from './MyConnections';
import HackathonDiscovery from './HackathonDiscovery';
import TeamConnect from './TeamConnect';
import ChatWindow from './ChatWindow';

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [stats, setStats] = useState({
    connections: 12,
    skillMatches: 8,
    hackathonsJoined: 3,
    requestsSent: 5,
    teamsJoined: 2
  });

  const { currentUser, userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully! 👋');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'browse', label: 'Browse Students', icon: Search },
    { id: 'connections', label: 'My Network', icon: Users },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'teams', label: 'Team Connect', icon: Code },
    { id: 'chat', label: 'Chat', icon: MessageCircle }
  ];

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>
      <h3 className="text-gray-300 font-medium">{title}</h3>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background Container - ALWAYS RENDERED */}
      <div className="fixed inset-0 z-0">
        {/* Primary Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.3) contrast(1.2)',
            display: videoLoaded ? 'block' : 'none'
          }}
          onLoadedData={() => {
            console.log('✅ Video loaded successfully');
            setVideoLoaded(true);
          }}
          onError={(e) => {
            console.log('❌ Video failed to load, using fallback');
            setVideoLoaded(false);
          }}
          onCanPlay={() => {
            console.log('✅ Video can play');
            setVideoLoaded(true);
          }}
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <source
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
            type="video/mp4"
          />
        </video>

        {/* Animated Fallback Background - ALWAYS VISIBLE UNTIL VIDEO LOADS */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
          style={{ display: videoLoaded ? 'none' : 'block' }}
        >
          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Floating Code Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 text-purple-400/20 text-6xl font-mono"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {'</>'}
            </motion.div>
            <motion.div
              className="absolute top-20 right-20 text-blue-400/20 text-4xl font-mono"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {'{ }'}
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-20 text-green-400/20 text-5xl font-mono"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {'()'}
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-10 text-yellow-400/20 text-3xl font-mono"
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {'[]'}
            </motion.div>
          </div>

          {/* Moving Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'grid-move 20s linear infinite'
              }}
            ></div>
          </div>
        </div>

        {/* Overlay for better text readability - ALWAYS VISIBLE */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PeerConnect</h1>
                <p className="text-xs text-gray-400">Developer Network</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{userProfile?.name || currentUser?.email}</p>
                <p className="text-xs text-gray-400">{userProfile?.department}</p>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                {userProfile?.profilePicture ? (
                  <img src={userProfile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  Welcome back, {userProfile?.name?.split(' ')[0] || 'Developer'}! 🚀
                </motion.h2>
                <p className="text-gray-300 text-lg">Ready to connect and build something amazing?</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                  icon={Users}
                  title="Network Size"
                  value={stats.connections}
                  color="from-blue-500 to-cyan-500"
                  description="connections"
                />
                <StatCard
                  icon={Zap}
                  title="Skill Matches"
                  value={stats.skillMatches}
                  color="from-purple-500 to-pink-500"
                  description="shared skills"
                />
                <StatCard
                  icon={Trophy}
                  title="Hackathons"
                  value={stats.hackathonsJoined}
                  color="from-yellow-500 to-orange-500"
                  description="participated"
                />
                <StatCard
                  icon={Target}
                  title="Requests Sent"
                  value={stats.requestsSent}
                  color="from-green-500 to-emerald-500"
                  description="pending"
                />
                <StatCard
                  icon={Code}
                  title="Teams Joined"
                  value={stats.teamsJoined}
                  color="from-indigo-500 to-purple-500"
                  description="active teams"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('browse')}
                    className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg text-left hover:border-purple-400 transition-all"
                  >
                    <Search className="w-6 h-6 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white">Find Peers</h4>
                    <p className="text-sm text-gray-400">Discover students with similar interests</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('hackathons')}
                    className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg text-left hover:border-yellow-400 transition-all"
                  >
                    <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                    <h4 className="font-semibold text-white">Join Hackathons</h4>
                    <p className="text-sm text-gray-400">Explore upcoming coding competitions</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('teams')}
                    className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg text-left hover:border-green-400 transition-all"
                  >
                    <Code className="w-6 h-6 text-green-400 mb-2" />
                    <h4 className="font-semibold text-white">Form Teams</h4>
                    <p className="text-sm text-gray-400">Connect with teammates for projects</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('chat')}
                    className="p-4 bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-lg text-left hover:border-pink-400 transition-all"
                  >
                    <MessageCircle className="w-6 h-6 text-pink-400 mb-2" />
                    <h4 className="font-semibold text-white">Start Chat</h4>
                    <p className="text-sm text-gray-400">Connect and collaborate instantly</p>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tab content */}
          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ProfileForm />
            </motion.div>
          )}
          {activeTab === 'browse' && (
            <motion.div key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <BrowseStudents />
            </motion.div>
          )}
          {activeTab === 'connections' && (
            <motion.div key="connections" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MyConnections />
            </motion.div>
          )}
          {activeTab === 'hackathons' && (
            <motion.div key="hackathons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <HackathonDiscovery />
            </motion.div>
          )}
          {activeTab === 'teams' && (
            <motion.div key="teams" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <TeamConnect />
            </motion.div>
          )}
          {activeTab === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ChatWindow />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Chat Window Component */}
      <ChatWindow />
    </div>
  );
};

export default EnhancedDashboard;
