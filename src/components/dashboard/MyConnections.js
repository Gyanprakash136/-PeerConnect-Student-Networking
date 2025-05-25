// src/components/dashboard/MyConnections.js
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users, User, MessageCircle, Mail, Phone, MapPin,
  Search, Filter, Star, Calendar, Briefcase, Award,
  ExternalLink, Heart, Eye, MoreVertical, UserMinus,
  Video, Coffee, BookOpen, Zap, Target, TrendingUp
} from 'lucide-react';
import { toast } from 'react-toastify';

const MyConnections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterConnectionType, setFilterConnectionType] = useState('');
  const [favoriteConnections, setFavoriteConnections] = useState([1, 3]);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Mock connections data - these would come from your auth context
  const mockConnections = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun.sharma@example.com",
      department: "Computer Science",
      year: "3rd Year",
      location: "Delhi, India",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer passionate about AI and machine learning technologies.",
      skills: ["React", "Python", "TensorFlow", "Node.js"],
      interests: ["Web Development", "AI", "Machine Learning"],
      projectAreas: ["Full-stack Development", "AI Applications"],
      connectionDate: "2025-01-15",
      connectionType: "Peer",
      mutualConnections: 5,
      collaborations: 2,
      rating: 4.8,
      isOnline: true,
      lastActive: "2 hours ago",
      sharedProjects: ["AI Healthcare Platform", "Smart Campus App"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/arjun-sharma",
        github: "https://github.com/arjun-sharma",
        portfolio: "https://arjunsharma.dev"
      }
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      department: "Engineering",
      year: "2nd Year",
      location: "Mumbai, India",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Robotics engineer focused on sustainable technology and IoT solutions.",
      skills: ["Arduino", "C++", "CAD Design", "Python"],
      interests: ["Robotics", "IoT", "Sustainability"],
      projectAreas: ["Robotics", "Green Technology", "IoT Solutions"],
      connectionDate: "2025-01-20",
      connectionType: "Teammate",
      mutualConnections: 3,
      collaborations: 1,
      rating: 4.6,
      isOnline: false,
      lastActive: "1 day ago",
      sharedProjects: ["Green Tech Warriors Project"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/priya-patel",
        github: "https://github.com/priya-patel"
      }
    },
    {
      id: 3,
      name: "Vikash Gupta",
      email: "vikash.gupta@example.com",
      department: "Computer Science",
      year: "3rd Year",
      location: "Pune, India",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "Cybersecurity enthusiast and blockchain developer with focus on DeFi.",
      skills: ["Network Security", "Cryptography", "Solidity", "Ethical Hacking"],
      interests: ["Cybersecurity", "Blockchain", "Privacy"],
      projectAreas: ["Security Research", "Blockchain Applications", "DeFi"],
      connectionDate: "2025-01-25",
      connectionType: "Mentor",
      mutualConnections: 8,
      collaborations: 3,
      rating: 4.9,
      isOnline: true,
      lastActive: "30 minutes ago",
      sharedProjects: ["DeFi Lending Platform", "Security Audit Tool", "Blockchain Voting"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/vikash-gupta",
        github: "https://github.com/vikash-gupta",
        twitter: "https://twitter.com/vikash_security"
      }
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      department: "Psychology",
      year: "2nd Year",
      location: "Hyderabad, India",
      profilePicture: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      bio: "Psychology student interested in mental health technology and AI ethics.",
      skills: ["Research Methods", "Data Analysis", "Counseling", "Statistics"],
      interests: ["Cognitive Psychology", "Mental Health", "AI Ethics"],
      projectAreas: ["Mental Health Apps", "Research Projects", "AI Ethics"],
      connectionDate: "2025-02-01",
      connectionType: "Collaborator",
      mutualConnections: 2,
      collaborations: 1,
      rating: 4.5,
      isOnline: false,
      lastActive: "3 hours ago",
      sharedProjects: ["Mental Health Chatbot"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sneha-reddy",
        researchgate: "https://researchgate.net/profile/sneha-reddy"
      }
    },
    {
      id: 5,
      name: "Karan Mehta",
      email: "karan.mehta@example.com",
      department: "Computer Science",
      year: "4th Year",
      location: "Kolkata, India",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Game developer creating immersive VR experiences and indie games.",
      skills: ["Unity", "C#", "Blender", "OpenGL", "JavaScript"],
      interests: ["Game Development", "VR/AR", "Graphics Programming"],
      projectAreas: ["Game Development", "Virtual Reality", "3D Graphics"],
      connectionDate: "2025-02-05",
      connectionType: "Peer",
      mutualConnections: 4,
      collaborations: 2,
      rating: 4.7,
      isOnline: true,
      lastActive: "1 hour ago",
      sharedProjects: ["VR Education Platform", "Indie Game Studio"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/karan-mehta",
        github: "https://github.com/karan-mehta",
        portfolio: "https://karanmehta.games"
      }
    },
    {
      id: 6,
      name: "Deepika Joshi",
      email: "deepika.joshi@example.com",
      department: "Science",
      year: "3rd Year",
      location: "Jaipur, India",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Data scientist passionate about healthcare analytics and bioinformatics.",
      skills: ["Python", "R", "SQL", "Tableau", "Machine Learning"],
      interests: ["Data Science", "Bioinformatics", "Healthcare Analytics"],
      projectAreas: ["Data Analytics", "Bioinformatics", "Research"],
      connectionDate: "2025-02-10",
      connectionType: "Study Partner",
      mutualConnections: 6,
      collaborations: 1,
      rating: 4.6,
      isOnline: false,
      lastActive: "5 hours ago",
      sharedProjects: ["Healthcare Data Analysis"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/deepika-joshi",
        github: "https://github.com/deepika-joshi",
        kaggle: "https://kaggle.com/deepika-joshi"
      }
    }
  ];

  const filteredConnections = useMemo(() => {
    return mockConnections.filter(connection => {
      const matchesSearch = searchTerm === '' ||
        connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        connection.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        connection.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartment = filterDepartment === '' || connection.department === filterDepartment;
      const matchesType = filterConnectionType === '' || connection.connectionType === filterConnectionType;

      return matchesSearch && matchesDepartment && matchesType;
    });
  }, [searchTerm, filterDepartment, filterConnectionType]);

  const handleMessage = (connection) => {
    toast.info(`Opening chat with ${connection.name}...`);
  };

  const handleVideoCall = (connection) => {
    toast.info(`Starting video call with ${connection.name}...`);
  };

  const handleEmail = (connection) => {
    window.open(`mailto:${connection.email}`, '_blank');
  };

  const handleFavorite = (connection) => {
    if (favoriteConnections.includes(connection.id)) {
      setFavoriteConnections(prev => prev.filter(id => id !== connection.id));
      toast.info(`Removed ${connection.name} from favorites`);
    } else {
      setFavoriteConnections(prev => [...prev, connection.id]);
      toast.success(`Added ${connection.name} to favorites! ⭐`);
    }
  };

  const handleRemoveConnection = (connection) => {
    toast.error(`Removed ${connection.name} from connections`);
  };

  const handleViewProfile = (connection) => {
    setSelectedConnection(connection);
    toast.info(`Viewing ${connection.name}'s detailed profile...`);
  };

  const getConnectionTypeColor = (type) => {
    switch (type) {
      case 'Peer': return 'text-blue-400 bg-blue-400/10';
      case 'Teammate': return 'text-green-400 bg-green-400/10';
      case 'Mentor': return 'text-purple-400 bg-purple-400/10';
      case 'Collaborator': return 'text-yellow-400 bg-yellow-400/10';
      case 'Study Partner': return 'text-pink-400 bg-pink-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const departments = [...new Set(mockConnections.map(c => c.department))];
  const connectionTypes = [...new Set(mockConnections.map(c => c.connectionType))];

  const networkStats = {
    totalConnections: mockConnections.length,
    onlineNow: mockConnections.filter(c => c.isOnline).length,
    totalCollaborations: mockConnections.reduce((sum, c) => sum + c.collaborations, 0),
    averageRating: (mockConnections.reduce((sum, c) => sum + c.rating, 0) / mockConnections.length).toFixed(1)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-green-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">My Network</h2>
            <p className="text-gray-400">Your connections and collaborators</p>
          </div>
        </div>
        <div className="text-sm text-green-400">
          {filteredConnections.length} connections
        </div>
      </div>

      {mockConnections.length === 0 ? (
        /* Empty State */
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8 text-center">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No Connections Yet</h3>
          <p className="text-gray-500 mb-6">Start connecting with fellow students to build your network!</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Browse the "Browse Students" tab to discover peers with similar interests and send connection requests.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Network Stats */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Network Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{networkStats.totalConnections}</div>
                <div className="text-sm text-gray-400">Total Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{networkStats.onlineNow}</div>
                <div className="text-sm text-gray-400">Online Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{networkStats.totalCollaborations}</div>
                <div className="text-sm text-gray-400">Collaborations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{networkStats.averageRating}</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterConnectionType}
                  onChange={(e) => setFilterConnectionType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  <option value="">All Types</option>
                  {connectionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all"
              >
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                        {connection.profilePicture ? (
                          <img
                            src={connection.profilePicture}
                            alt={`${connection.name}'s profile`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                        connection.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{connection.name}</h3>
                      <p className="text-gray-400 text-sm">{connection.year}</p>
                      <p className="text-gray-500 text-sm flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {connection.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <button
                      onClick={() => handleFavorite(connection)}
                      className={`p-1 rounded transition-colors ${
                        favoriteConnections.includes(connection.id)
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-gray-500 hover:text-yellow-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favoriteConnections.includes(connection.id) ? 'fill-current' : ''}`} />
                    </button>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConnectionTypeColor(connection.connectionType)}`}>
                      {connection.connectionType}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{connection.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-blue-400">{connection.mutualConnections}</div>
                    <div className="text-xs text-gray-500">Mutual</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-400">{connection.collaborations}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-yellow-400 flex items-center justify-center">
                      <Star className="w-3 h-3 mr-1" />
                      {connection.rating}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {connection.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {connection.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                        +{connection.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMessage(connection)}
                    className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVideoCall(connection)}
                    className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-all text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Video className="w-4 h-4" />
                    <span>Call</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewProfile(connection)}
                    className="bg-gray-700 text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-600 transition-all text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Profile</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEmail(connection)}
                    className="bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-all text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </motion.button>
                </div>

                {/* Connection Info */}
                <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Connected: {new Date(connection.connectionDate).toLocaleDateString()}</span>
                    <span>Active: {connection.lastActive}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredConnections.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No connections found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MyConnections;
