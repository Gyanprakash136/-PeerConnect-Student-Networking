// src/components/dashboard/TeamConnect.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Users, UserPlus, Send, Star, Calendar,
  Trophy, Search, Plus, MessageCircle, ExternalLink,
  Info, CheckCircle, Copy, Filter, MapPin, Clock,
  Award, Target, Zap
} from 'lucide-react';
import { toast } from 'react-toastify';

const TeamConnect = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [inviteEmail, setInviteEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHackathon, setFilterHackathon] = useState('');
  const [joinedTeams, setJoinedTeams] = useState([1]); // Pre-joined team 1

  // Enhanced Mock teams data with more details
  const mockTeams = [
    {
      id: 1,
      name: "AI Innovators",
      description: "Building next-gen AI solutions for healthcare and education using cutting-edge machine learning technologies.",
      hackathon: "HackIndia 2025",
      members: ["Arjun Sharma", "Priya Patel", "You"],
      skillsNeeded: ["Machine Learning", "Python", "React", "TensorFlow"],
      leadBy: "Arjun Sharma",
      isJoined: true,
      maxMembers: 4,
      currentMembers: 3,
      experience: "Intermediate",
      timeCommitment: "Full-time",
      projectIdea: "AI-powered healthcare diagnosis platform",
      lookingFor: ["Backend Developer", "UI/UX Designer"],
      teamRating: 4.8,
      createdDate: "2025-01-15"
    },
    {
      id: 2,
      name: "Blockchain Builders",
      description: "Creating decentralized applications for financial inclusion and democratizing access to financial services.",
      hackathon: "Agentic Ethereum Hackathon",
      members: ["Vikash Gupta", "Rohit Kumar"],
      skillsNeeded: ["Solidity", "Web3", "Smart Contracts", "DeFi"],
      leadBy: "Vikash Gupta",
      isJoined: false,
      maxMembers: 5,
      currentMembers: 2,
      experience: "Advanced",
      timeCommitment: "Full-time",
      projectIdea: "DeFi lending platform for emerging markets",
      lookingFor: ["Frontend Developer", "Smart Contract Developer", "Product Manager"],
      teamRating: 4.6,
      createdDate: "2025-01-20"
    },
    {
      id: 3,
      name: "Green Tech Warriors",
      description: "Sustainable technology solutions for environmental challenges and climate change mitigation.",
      hackathon: "AgriTech Hack",
      members: ["Sneha Reddy", "Deepika Joshi", "Ananya Singh"],
      skillsNeeded: ["IoT", "Data Science", "Mobile Development", "Sustainability"],
      leadBy: "Sneha Reddy",
      isJoined: false,
      maxMembers: 4,
      currentMembers: 3,
      experience: "Intermediate",
      timeCommitment: "Part-time",
      projectIdea: "Smart farming IoT solution for water conservation",
      lookingFor: ["Hardware Engineer"],
      teamRating: 4.4,
      createdDate: "2025-01-25"
    },
    {
      id: 4,
      name: "FinTech Revolutionaries",
      description: "Transforming financial services with innovative technology solutions for the next generation.",
      hackathon: "FinTech Revolution 2025",
      members: ["Karan Mehta", "Aditya Verma"],
      skillsNeeded: ["React Native", "Node.js", "Payment APIs", "Security"],
      leadBy: "Karan Mehta",
      isJoined: false,
      maxMembers: 5,
      currentMembers: 2,
      experience: "Intermediate",
      timeCommitment: "Full-time",
      projectIdea: "Digital wallet for rural communities",
      lookingFor: ["Backend Developer", "Security Expert", "UX Designer"],
      teamRating: 4.7,
      createdDate: "2025-02-01"
    },
    {
      id: 5,
      name: "EduTech Pioneers",
      description: "Revolutionizing education through technology and making quality education accessible to everyone.",
      hackathon: "Code Cubicle - 4",
      members: ["Kavya Nair"],
      skillsNeeded: ["Flutter", "Firebase", "AI", "Educational Technology"],
      leadBy: "Kavya Nair",
      isJoined: false,
      maxMembers: 4,
      currentMembers: 1,
      experience: "Beginner",
      timeCommitment: "Part-time",
      projectIdea: "AI-powered personalized learning platform",
      lookingFor: ["Mobile Developer", "AI Engineer", "Content Creator"],
      teamRating: 4.2,
      createdDate: "2025-02-05"
    }
  ];

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = searchTerm === '' ||
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesHackathon = filterHackathon === '' || team.hackathon === filterHackathon;

    return matchesSearch && matchesHackathon;
  });

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}! 📧`);
    setInviteEmail('');
  };

  const handleCreateTeam = () => {
    if (!teamName || !teamDescription || !selectedHackathon) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success(`Team "${teamName}" created successfully! 🎉`);
    setTeamName('');
    setTeamDescription('');
    setSelectedHackathon('');
  };

  const handleJoinTeam = (team) => {
    if (team.currentMembers >= team.maxMembers) {
      toast.error('Team is full!');
      return;
    }
    setJoinedTeams(prev => [...prev, team.id]);
    toast.success(`Joined team "${team.name}"! Welcome aboard! 🚀`);
  };

  const handleLeaveTeam = (team) => {
    setJoinedTeams(prev => prev.filter(id => id !== team.id));
    toast.info(`Left team "${team.name}"`);
  };

  const copyInviteLink = () => {
    const inviteLink = `https://peerconnect.dev/invite/team-${Date.now()}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard! 📋');
  };

  const getExperienceColor = (experience) => {
    switch (experience) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getCommitmentColor = (commitment) => {
    switch (commitment) {
      case 'Full-time': return 'text-blue-400 bg-blue-400/10';
      case 'Part-time': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const hackathons = [...new Set(mockTeams.map(team => team.hackathon))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code className="w-8 h-8 text-purple-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Team Connect</h2>
            <p className="text-gray-400">Form teams and collaborate on hackathons</p>
          </div>
        </div>
        <div className="text-sm text-purple-400">
          {joinedTeams.length} teams joined
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">{mockTeams.length}</div>
            <div className="text-xs text-gray-400">Active Teams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{joinedTeams.length}</div>
            <div className="text-xs text-gray-400">Teams Joined</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {mockTeams.reduce((total, team) => total + (team.maxMembers - team.currentMembers), 0)}
            </div>
            <div className="text-xs text-gray-400">Open Positions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{hackathons.length}</div>
            <div className="text-xs text-gray-400">Hackathons</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg p-1">
        {[
          { id: 'browse', label: 'Browse Teams', icon: Search },
          { id: 'create', label: 'Create Team', icon: Plus },
          { id: 'invite', label: 'Invite Members', icon: UserPlus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Browse Teams Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams, skills, or projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterHackathon}
                  onChange={(e) => setFilterHackathon(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                  <option value="">All Hackathons</option>
                  {hackathons.map(hackathon => (
                    <option key={hackathon} value={hackathon}>{hackathon}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{team.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 text-sm">{team.teamRating}</span>
                      </div>
                    </div>
                    <p className="text-purple-400 text-sm font-medium">{team.hackathon}</p>
                    <p className="text-gray-500 text-xs">Led by {team.leadBy}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {joinedTeams.includes(team.id) && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        Joined
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(team.experience)}`}>
                      {team.experience}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommitmentColor(team.timeCommitment)}`}>
                      {team.timeCommitment}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{team.description}</p>

                {/* Project Idea */}
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Project Idea</span>
                  </div>
                  <p className="text-blue-200 text-sm">{team.projectIdea}</p>
                </div>

                {/* Team Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Team Size</span>
                    <span className="text-sm text-gray-300">{team.currentMembers}/{team.maxMembers} members</span>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Members</span>
                    <p className="text-sm text-gray-300">{team.members.join(', ')}</p>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Looking For</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {team.lookingFor.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skills Needed</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {team.skillsNeeded.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {!joinedTeams.includes(team.id) ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleJoinTeam(team)}
                      disabled={team.currentMembers >= team.maxMembers}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 ${
                        team.currentMembers >= team.maxMembers
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{team.currentMembers >= team.maxMembers ? 'Team Full' : 'Join Team'}</span>
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Team Chat</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLeaveTeam(team)}
                        className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all text-sm"
                      >
                        Leave
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create Team Tab */}
      {activeTab === 'create' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Create New Team</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  placeholder="Describe your team's goals and project idea"
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Hackathon *
                </label>
                <select
                  value={selectedHackathon}
                  onChange={(e) => setSelectedHackathon(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a hackathon</option>
                  <option value="HackIndia 2025">HackIndia 2025</option>
                  <option value="Agentic Ethereum Hackathon">Agentic Ethereum Hackathon</option>
                  <option value="Code Cubicle - 4">Code Cubicle - 4</option>
                  <option value="HACKAMANIA 2025">HACKAMANIA 2025</option>
                  <option value="FinTech Revolution 2025">FinTech Revolution 2025</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateTeam}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Members Tab */}
      {activeTab === 'invite' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Invite Team Members</h3>

            <div className="space-y-6">
              {/* Email Invitation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address to invite"
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInvite}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invite</span>
                  </motion.button>
                </div>
              </div>

              {/* Invite Link */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-blue-300">Share Invite Link</h4>
                </div>
                <p className="text-blue-200 text-sm mb-3">
                  Generate a shareable link to invite multiple members at once
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyInviteLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Invite Link</span>
                </motion.button>
              </div>

              {/* Invitation Tips */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="font-medium text-green-300">Invitation Tips</h4>
                </div>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Include your team's goals and hackathon details</li>
                  <li>• Mention specific skills you're looking for</li>
                  <li>• Share your team's vision and project idea</li>
                  <li>• Be clear about time commitments and expectations</li>
                </ul>
              </div>

              {/* Quick Invite Suggestions */}
              <div>
                <h4 className="font-medium text-gray-300 mb-3">Quick Invite Suggestions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'arjun.sharma@example.com',
                    'priya.patel@example.com',
                    'vikash.gupta@example.com',
                    'sneha.reddy@example.com'
                  ].map((email) => (
                    <motion.button
                      key={email}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInviteEmail(email)}
                      className="text-left p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-all text-sm"
                    >
                      {email}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamConnect;
