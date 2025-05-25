// src/components/dashboard/HackathonDiscovery.js
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Calendar, Users, ExternalLink,
  Search, Filter, MapPin, Clock, Star, DollarSign,
  Bookmark, BookmarkCheck, Share2, Heart
} from 'lucide-react';
import { toast } from 'react-toastify';

const HackathonDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [bookmarkedHackathons, setBookmarkedHackathons] = useState([]);
  const [favoriteHackathons, setFavoriteHackathons] = useState([]);

  // Enhanced hackathons with more details
  const hackathons = [
    {
      id: 1,
      name: "HackIndia 2025",
      platform: "HackIndia",
      date: "2025-09-15",
      endDate: "2025-09-17",
      location: "Delhi, India",
      skillsNeeded: ["Web3", "AI", "Blockchain", "Machine Learning"],
      prize: "$150,000",
      participants: "25,000+",
      status: "upcoming",
      registrationLink: "https://hackindia.xyz",
      description: "India's Biggest Web3 & AI hackathon series. Be a part of the revolution empowering the next generation of India.",
      difficulty: "Intermediate",
      duration: "3 days",
      organizer: "HackIndia Foundation",
      themes: ["Web3", "AI/ML", "Fintech", "Healthcare"],
      registrationDeadline: "2025-09-10",
      teamSize: "2-4 members",
      rating: 4.8
    },
    {
      id: 2,
      name: "Agentic Ethereum Hackathon India",
      platform: "Ethereum Foundation",
      date: "2025-07-02",
      endDate: "2025-07-05",
      location: "Mumbai, India",
      skillsNeeded: ["Ethereum", "Solidity", "Web3", "DeFi"],
      prize: "$75,000",
      participants: "5,000+",
      status: "upcoming",
      registrationLink: "https://reskilll.com/allhacks",
      description: "Empowering India to lead the Web3 AI evolution with decentralized agents on Ethereum.",
      difficulty: "Advanced",
      duration: "4 days",
      organizer: "Ethereum Foundation India",
      themes: ["DeFi", "NFTs", "DAOs", "Smart Contracts"],
      registrationDeadline: "2025-06-25",
      teamSize: "1-5 members",
      rating: 4.9
    },
    {
      id: 3,
      name: "Code Cubicle - 4",
      platform: "Tech Community",
      date: "2025-07-25",
      endDate: "2025-07-27",
      location: "Bangalore, India",
      skillsNeeded: ["Full Stack", "Mobile Dev", "AI", "Cloud"],
      prize: "$25,000",
      participants: "2,000+",
      status: "upcoming",
      registrationLink: "https://reskilll.com/allhacks",
      description: "The fourth edition of premier hackathon series where innovation meets execution!",
      difficulty: "Beginner",
      duration: "3 days",
      organizer: "Code Cubicle Community",
      themes: ["EdTech", "HealthTech", "Social Impact", "Innovation"],
      registrationDeadline: "2025-07-20",
      teamSize: "2-6 members",
      rating: 4.5
    },
    {
      id: 4,
      name: "HACKAMANIA 2025",
      platform: "The Elites",
      date: "2025-06-10",
      endDate: "2025-06-10",
      location: "Hyderabad, India",
      skillsNeeded: ["Web Dev", "Mobile", "IoT", "Data Science"],
      prize: "$15,000",
      participants: "1,500+",
      status: "upcoming",
      registrationLink: "https://reskilll.com/allhacks",
      description: "8-hour student-led hackathon that celebrates innovation, technology, and real-world problem solving.",
      difficulty: "Beginner",
      duration: "8 hours",
      organizer: "The Elites Tech Club",
      themes: ["Student Innovation", "Quick Prototyping", "Tech Solutions"],
      registrationDeadline: "2025-06-05",
      teamSize: "2-4 members",
      rating: 4.3
    },
    {
      id: 5,
      name: "AgriTech Hack",
      platform: "AgriTech India",
      date: "2025-05-20",
      endDate: "2025-05-22",
      location: "Pune, India",
      skillsNeeded: ["IoT", "AI", "Sustainability", "Mobile Dev"],
      prize: "$20,000",
      participants: "800+",
      status: "registration-closed",
      registrationLink: "https://reskilll.com/allhacks",
      description: "Revolutionizing the agricultural sector through technology and sustainable solutions.",
      difficulty: "Intermediate",
      duration: "3 days",
      organizer: "AgriTech Innovation Hub",
      themes: ["Smart Farming", "Sustainability", "Rural Tech", "Food Security"],
      registrationDeadline: "2025-05-15",
      teamSize: "3-5 members",
      rating: 4.6
    },
    {
      id: 6,
      name: "FinTech Revolution 2025",
      platform: "FinTech India",
      date: "2025-08-12",
      endDate: "2025-08-14",
      location: "Mumbai, India",
      skillsNeeded: ["Blockchain", "API", "Security", "Mobile"],
      prize: "$100,000",
      participants: "8,000+",
      status: "upcoming",
      registrationLink: "https://fintechindia.com/hackathon",
      description: "Transform the financial landscape with cutting-edge technology solutions.",
      difficulty: "Advanced",
      duration: "3 days",
      organizer: "FinTech India Association",
      themes: ["Digital Payments", "Crypto", "Banking Tech", "Insurance"],
      registrationDeadline: "2025-08-05",
      teamSize: "2-5 members",
      rating: 4.7
    }
  ];

  const filteredHackathons = useMemo(() => {
    return hackathons.filter(hackathon => {
      const matchesSearch = searchTerm === '' ||
        hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        hackathon.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSkill = filterSkill === '' ||
        hackathon.skillsNeeded.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase()));

      const matchesStatus = filterStatus === '' || hackathon.status === filterStatus;

      return matchesSearch && matchesSkill && matchesStatus;
    });
  }, [searchTerm, filterSkill, filterStatus]);

  const handleBookmark = (hackathon) => {
    if (bookmarkedHackathons.includes(hackathon.id)) {
      setBookmarkedHackathons(prev => prev.filter(id => id !== hackathon.id));
      toast.info(`Removed ${hackathon.name} from bookmarks`);
    } else {
      setBookmarkedHackathons(prev => [...prev, hackathon.id]);
      toast.success(`Bookmarked ${hackathon.name}! 📌`);
    }
  };

  const handleFavorite = (hackathon) => {
    if (favoriteHackathons.includes(hackathon.id)) {
      setFavoriteHackathons(prev => prev.filter(id => id !== hackathon.id));
      toast.info(`Removed ${hackathon.name} from favorites`);
    } else {
      setFavoriteHackathons(prev => [...prev, hackathon.id]);
      toast.success(`Added ${hackathon.name} to favorites! ❤️`);
    }
  };

  const handleShare = (hackathon) => {
    const shareText = `Check out ${hackathon.name} - ${hackathon.description}`;
    if (navigator.share) {
      navigator.share({
        title: hackathon.name,
        text: shareText,
        url: hackathon.registrationLink
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${hackathon.registrationLink}`);
      toast.success('Hackathon details copied to clipboard! 📋');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'ongoing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'registration-closed': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const isRegistrationOpen = (hackathon) => {
    const today = new Date();
    const deadline = new Date(hackathon.registrationDeadline);
    return today <= deadline && hackathon.status === 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Hackathon Discovery</h2>
            <p className="text-gray-400">Find your next coding adventure and win amazing prizes</p>
          </div>
        </div>
        <div className="text-sm text-purple-400">
          {filteredHackathons.length} hackathons found
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">{hackathons.filter(h => h.status === 'upcoming').length}</div>
            <div className="text-xs text-gray-400">Upcoming</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{bookmarkedHackathons.length}</div>
            <div className="text-xs text-gray-400">Bookmarked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              ${hackathons.reduce((total, h) => total + parseInt(h.prize.replace(/[$,]/g, '')), 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Total Prizes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {hackathons.reduce((total, h) => total + parseInt(h.participants.replace(/[+,]/g, '')), 0).toLocaleString()}+
            </div>
            <div className="text-xs text-gray-400">Participants</div>
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
              placeholder="Search hackathons, skills, or themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="">All Skills</option>
              <option value="AI">AI/ML</option>
              <option value="Web3">Web3/Blockchain</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Mobile">Mobile Dev</option>
              <option value="IoT">IoT</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="registration-closed">Registration Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
          >
            {/* Header with Actions */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 text-sm">{hackathon.rating}</span>
                  </div>
                </div>
                <p className="text-purple-400 text-sm font-medium">{hackathon.platform}</p>
                <p className="text-gray-500 text-xs">by {hackathon.organizer}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleBookmark(hackathon)}
                    className={`p-1 rounded transition-colors ${
                      bookmarkedHackathons.includes(hackathon.id)
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-gray-500 hover:text-blue-400'
                    }`}
                  >
                    {bookmarkedHackathons.includes(hackathon.id) ?
                      <BookmarkCheck className="w-4 h-4" /> :
                      <Bookmark className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => handleFavorite(hackathon)}
                    className={`p-1 rounded transition-colors ${
                      favoriteHackathons.includes(hackathon.id)
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-gray-500 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favoriteHackathons.includes(hackathon.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleShare(hackathon)}
                    className="p-1 rounded text-gray-500 hover:text-green-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(hackathon.status)}`}>
                  {hackathon.status.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(hackathon.difficulty)}`}>
                  {hackathon.difficulty}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4">{hackathon.description}</p>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(hackathon.date).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</span>
                <span className="ml-2 text-purple-400">({hackathon.duration})</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{hackathon.location}</span>
                <span className="ml-4 text-gray-500">Team: {hackathon.teamSize}</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>{hackathon.participants} participants</span>
                <DollarSign className="w-4 h-4 ml-4 mr-1" />
                <span className="text-yellow-400">{hackathon.prize} prize pool</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Registration deadline: {new Date(hackathon.registrationDeadline).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Themes */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Themes:</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {hackathon.themes.map((theme) => (
                  <span
                    key={theme}
                    className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Skills needed:</p>
              <div className="flex flex-wrap gap-2">
                {hackathon.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <motion.a
              href={hackathon.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                !isRegistrationOpen(hackathon)
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
              }`}
            >
              <span>
                {!isRegistrationOpen(hackathon)
                  ? 'Registration Closed'
                  : 'Register Now'
                }
              </span>
              {isRegistrationOpen(hackathon) && <ExternalLink className="w-4 h-4" />}
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredHackathons.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No hackathons found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default HackathonDiscovery;
