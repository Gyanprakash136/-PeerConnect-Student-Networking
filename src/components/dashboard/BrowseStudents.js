// src/components/dashboard/BrowseStudents.js
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Users, ExternalLink, User, MapPin, BookOpen,
  Filter, MessageCircle, UserPlus, Wifi, WifiOff, Star,
  Heart, Eye, Clock
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const BrowseStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [connectedPeers, setConnectedPeers] = useState([]);
  const [viewedProfiles, setViewedProfiles] = useState([]);
  const [favoriteProfiles, setFavoriteProfiles] = useState([]);

  const { addConnection } = useAuth();

  // Enhanced Mock Indian student data
  const mockStudents = [
    {
      id: 1,
      name: "Arjun Sharma",
      year: "3rd Year",
      department: "Computer Science",
      interests: "Web Development, AI, Machine Learning",
      skills: "React, Python, TensorFlow, Node.js",
      projectAreas: "Full-stack Development, AI Applications",
      bio: "Passionate about creating innovative web applications and exploring AI technologies. Love to solve complex problems.",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_arjun_2025",
      location: "Delhi, India",
      joinedDate: "2023-08-15",
      projectCount: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: "Priya Patel",
      year: "2nd Year",
      department: "Engineering",
      interests: "Robotics, IoT, Sustainability, Hardware",
      skills: "Arduino, C++, CAD Design, Python",
      projectAreas: "Robotics, Green Technology, IoT Solutions",
      bio: "Engineering student focused on sustainable technology solutions and robotics innovation.",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      peerId: "peer_priya_2025",
      location: "Mumbai, India",
      joinedDate: "2024-01-20",
      projectCount: 8,
      rating: 4.6
    },
    {
      id: 3,
      name: "Rohit Kumar",
      year: "4th Year",
      department: "Business",
      interests: "Entrepreneurship, Marketing, Finance, Startups",
      skills: "Business Strategy, Digital Marketing, Financial Analysis",
      projectAreas: "Startup Development, Market Research, FinTech",
      bio: "Business student with a passion for entrepreneurship and building innovative startups.",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_rohit_2025",
      location: "Bangalore, India",
      joinedDate: "2022-09-10",
      projectCount: 15,
      rating: 4.9
    },
    {
      id: 4,
      name: "Ananya Singh",
      year: "1st Year",
      department: "Arts",
      interests: "Digital Art, Photography, UX Design, Creative Writing",
      skills: "Photoshop, Illustrator, Figma, After Effects",
      projectAreas: "Digital Design, User Experience, Creative Media",
      bio: "Creative arts student specializing in digital design and user experience with a passion for visual storytelling.",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_ananya_2025",
      location: "Chennai, India",
      joinedDate: "2024-07-01",
      projectCount: 5,
      rating: 4.4
    },
    {
      id: 5,
      name: "Vikash Gupta",
      year: "3rd Year",
      department: "Computer Science",
      interests: "Cybersecurity, Blockchain, Privacy, Ethical Hacking",
      skills: "Network Security, Cryptography, Ethical Hacking, Solidity",
      projectAreas: "Security Research, Blockchain Applications, DeFi",
      bio: "Computer science student focused on cybersecurity and blockchain technologies. Passionate about digital privacy.",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      peerId: "peer_vikash_2025",
      location: "Pune, India",
      joinedDate: "2023-03-12",
      projectCount: 10,
      rating: 4.7
    },
    {
      id: 6,
      name: "Sneha Reddy",
      year: "2nd Year",
      department: "Psychology",
      interests: "Cognitive Psychology, Research, Mental Health, AI Ethics",
      skills: "Research Methods, Data Analysis, Counseling, Statistics",
      projectAreas: "Mental Health Apps, Research Projects, AI Ethics",
      bio: "Psychology student interested in mental health technology and ethical AI development.",
      profilePicture: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_sneha_2025",
      location: "Hyderabad, India",
      joinedDate: "2024-02-28",
      projectCount: 7,
      rating: 4.5
    },
    {
      id: 7,
      name: "Karan Mehta",
      year: "4th Year",
      department: "Computer Science",
      interests: "Game Development, VR/AR, Graphics Programming",
      skills: "Unity, C#, Blender, OpenGL, JavaScript",
      projectAreas: "Game Development, Virtual Reality, 3D Graphics",
      bio: "Game development enthusiast working on immersive VR experiences and indie games.",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_karan_2025",
      location: "Kolkata, India",
      joinedDate: "2022-11-05",
      projectCount: 18,
      rating: 4.8
    },
    {
      id: 8,
      name: "Deepika Joshi",
      year: "3rd Year",
      department: "Science",
      interests: "Data Science, Bioinformatics, Research, Analytics",
      skills: "Python, R, SQL, Tableau, Machine Learning",
      projectAreas: "Data Analytics, Bioinformatics, Research",
      bio: "Data science student passionate about using analytics to solve real-world problems in healthcare.",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      peerId: "peer_deepika_2025",
      location: "Jaipur, India",
      joinedDate: "2023-06-18",
      projectCount: 11,
      rating: 4.6
    },
    {
      id: 9,
      name: "Aditya Verma",
      year: "2nd Year",
      department: "Computer Science",
      interests: "Mobile Development, Flutter, Cross-platform",
      skills: "Flutter, Dart, Firebase, React Native",
      projectAreas: "Mobile Apps, Cross-platform Development",
      bio: "Mobile app developer creating cross-platform solutions for real-world problems.",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      peerId: "peer_aditya_2025",
      location: "Ahmedabad, India",
      joinedDate: "2024-04-10",
      projectCount: 6,
      rating: 4.3
    },
    {
      id: 10,
      name: "Kavya Nair",
      year: "1st Year",
      department: "Engineering",
      interests: "Renewable Energy, Solar Technology, Sustainability",
      skills: "MATLAB, AutoCAD, Solar Design, Project Management",
      projectAreas: "Green Energy, Solar Solutions, Sustainability",
      bio: "Engineering student passionate about renewable energy and sustainable technology solutions.",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      peerId: "peer_kavya_2025",
      location: "Kochi, India",
      joinedDate: "2024-08-22",
      projectCount: 3,
      rating: 4.2
    }
  ];

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = searchTerm === '' ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.interests.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = filterDepartment === '' || student.department === filterDepartment;
      const matchesYear = filterYear === '' || student.year === filterYear;

      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [searchTerm, filterDepartment, filterYear]);

  const handleConnect = async (student) => {
    if (connectedPeers.includes(student.id)) {
      toast.info(`Already connected to ${student.name}!`);
      return;
    }

    try {
      setConnectedPeers(prev => [...prev, student.id]);
      // Add to auth context if available
      if (addConnection) {
        await addConnection(student.id);
      }
      toast.success(`Connected to ${student.name}! 🎉`);
    } catch (error) {
      toast.error('Failed to connect. Please try again.');
      setConnectedPeers(prev => prev.filter(id => id !== student.id));
    }
  };

  const handleMessage = (student) => {
    toast.info(`Opening chat with ${student.name}...`);
    // Add to viewed profiles
    if (!viewedProfiles.includes(student.id)) {
      setViewedProfiles(prev => [...prev, student.id]);
    }
  };

  const handleViewProfile = (student) => {
    if (!viewedProfiles.includes(student.id)) {
      setViewedProfiles(prev => [...prev, student.id]);
    }
    toast.info(`Viewing ${student.name}'s full profile...`);
  };

  const handleFavorite = (student) => {
    if (favoriteProfiles.includes(student.id)) {
      setFavoriteProfiles(prev => prev.filter(id => id !== student.id));
      toast.info(`Removed ${student.name} from favorites`);
    } else {
      setFavoriteProfiles(prev => [...prev, student.id]);
      toast.success(`Added ${student.name} to favorites! ⭐`);
    }
  };

  const departments = [...new Set(mockStudents.map(s => s.department))];
  const years = [...new Set(mockStudents.map(s => s.year))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Search className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Browse Students</h2>
            <p className="text-gray-400">Connect with peers and build your network</p>
          </div>
        </div>
        <div className="text-sm text-purple-400">
          {filteredStudents.length} students found
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, interests, skills, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
          >
            {/* Profile Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                  {student.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={`${student.name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                  student.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-white">{student.name}</h3>
                  <button
                    onClick={() => handleFavorite(student)}
                    className={`p-1 rounded-full transition-colors ${
                      favoriteProfiles.includes(student.id)
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-gray-500 hover:text-yellow-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favoriteProfiles.includes(student.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-gray-400 text-sm">{student.year}</p>
                <p className="text-gray-500 text-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {student.location}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    {student.isOnline ? (
                      <><Wifi className="w-3 h-3 text-green-400 mr-1" /><span className="text-xs text-green-400">Online</span></>
                    ) : (
                      <><WifiOff className="w-3 h-3 text-gray-500 mr-1" /><span className="text-xs text-gray-500">Offline</span></>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-yellow-400">{student.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {student.bio && (
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{student.bio}</p>
            )}

            {/* Stats */}
            <div className="flex justify-between items-center mb-4 text-xs text-gray-400">
              <span>{student.projectCount} projects</span>
              <span>Joined {new Date(student.joinedDate).getFullYear()}</span>
            </div>

            {/* Interests and Skills */}
            <div className="space-y-2 mb-4">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Interests</span>
                <p className="text-sm text-gray-300">{student.interests}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skills</span>
                <p className="text-sm text-gray-300">{student.skills}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleConnect(student)}
                disabled={connectedPeers.includes(student.id)}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center space-x-1 ${
                  connectedPeers.includes(student.id)
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{connectedPeers.includes(student.id) ? 'Connected' : 'Connect'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMessage(student)}
                className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleViewProfile(student)}
                className="px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Peer ID */}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Peer ID:</span> {student.peerId}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No students found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseStudents;
