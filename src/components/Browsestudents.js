// components/BrowseStudents.js
import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, User, MapPin, BookOpen } from 'lucide-react';

const BrowseStudents = ({ onConnect, sentRequests, userProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      year: "3rd Year",
      department: "Computer Science",
      interests: "Web Development, AI, Gaming",
      skills: "React, Python, Machine Learning",
      projectAreas: "Full-stack Development, AI Applications",
      bio: "Passionate about creating innovative web applications and exploring AI technologies.",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Chen",
      year: "2nd Year",
      department: "Engineering",
      interests: "Robotics, IoT, Sustainability",
      skills: "Arduino, C++, CAD Design",
      projectAreas: "Robotics, Green Technology",
      bio: "Engineering student focused on sustainable technology solutions.",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Marcus Williams",
      year: "4th Year",
      department: "Business",
      interests: "Entrepreneurship, Marketing, Finance",
      skills: "Business Strategy, Digital Marketing, Financial Analysis",
      projectAreas: "Startup Development, Market Research",
      bio: "Business student with a passion for entrepreneurship and innovation.",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      year: "1st Year",
      department: "Arts",
      interests: "Digital Art, Photography, UX Design",
      skills: "Photoshop, Illustrator, Figma",
      projectAreas: "Digital Design, User Experience",
      bio: "Creative arts student specializing in digital design and user experience.",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Kim",
      year: "3rd Year",
      department: "Computer Science",
      interests: "Cybersecurity, Blockchain, Privacy",
      skills: "Network Security, Cryptography, Ethical Hacking",
      projectAreas: "Security Research, Blockchain Applications",
      bio: "Computer science student focused on cybersecurity and privacy technologies.",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      year: "2nd Year",
      department: "Psychology",
      interests: "Cognitive Psychology, Research, Mental Health",
      skills: "Research Methods, Data Analysis, Counseling",
      projectAreas: "Mental Health Apps, Research Projects",
      bio: "Psychology student interested in mental health technology and research.",
      profilePicture: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      // Exclude current user
      if (userProfile && student.id === userProfile.id) return false;

      const matchesSearch = searchTerm === '' ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.interests.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = filterDepartment === '' || student.department === filterDepartment;
      const matchesYear = filterYear === '' || student.year === filterYear;

      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [searchTerm, filterDepartment, filterYear, userProfile]);

  const departments = [...new Set(mockStudents.map(s => s.department))];
  const years = [...new Set(mockStudents.map(s => s.year))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Browse Students</h2>
        </div>
        <div className="text-sm text-gray-500">
          {filteredStudents.length} students found
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, interests, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
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
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
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
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{student.name}</h3>
                  <p className="text-gray-600 text-sm">{student.year}</p>
                  <p className="text-gray-500 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {student.department}
                  </p>
                </div>
              </div>

              {/* Bio */}
              {student.bio && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{student.bio}</p>
              )}

              {/* Interests and Skills */}
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Interests</span>
                  <p className="text-sm text-gray-700">{student.interests}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skills</span>
                  <p className="text-sm text-gray-700">{student.skills}</p>
                </div>
              </div>

              {/* Connect Button */}
              <button
                onClick={() => onConnect(student)}
                disabled={sentRequests.includes(student.id)}
                className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                  sentRequests.includes(student.id)
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {sentRequests.includes(student.id) ? 'Request Sent' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseStudents;
