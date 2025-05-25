// src/components/dashboard/ProfileForm.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, User, Upload, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const ProfileForm = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    collegeId: '',
    year: '',
    department: '',
    profilePicture: '',
    skills: '',
    interests: '',
    projectAreas: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        collegeId: userProfile.collegeId || '',
        year: userProfile.year || '',
        department: userProfile.department || '',
        profilePicture: userProfile.profilePicture || '',
        skills: userProfile.skills || '',
        interests: userProfile.interests || '',
        projectAreas: userProfile.projectAreas || '',
        bio: userProfile.bio || ''
      });
      setImagePreview(userProfile.profilePicture || '');
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update image preview for profile picture URL
    if (name === 'profilePicture') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData);
      toast.success('Profile updated successfully! 🎉');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Computer Science', 'Engineering', 'Business', 'Arts', 'Science',
    'Medicine', 'Law', 'Education', 'Psychology', 'Mathematics',
    'Information Technology', 'Data Science', 'Cybersecurity', 'Design'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'PhD'];

  const skillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Machine Learning',
    'Data Science', 'UI/UX Design', 'Mobile Development', 'Cloud Computing', 'DevOps'
  ];

  const interestSuggestions = [
    'Web Development', 'Artificial Intelligence', 'Blockchain', 'Cybersecurity',
    'Game Development', 'Mobile Apps', 'Data Analytics', 'IoT', 'Robotics', 'Startups'
  ];

  const isProfileComplete = () => {
    const requiredFields = ['name', 'collegeId', 'year', 'department'];
    return requiredFields.every(field => formData[field]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Profile Completion Status */}
      <div className="mb-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            {isProfileComplete() ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
            <div>
              <h3 className="text-white font-medium">
                Profile Completion: {isProfileComplete() ? 'Complete' : 'Incomplete'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isProfileComplete()
                  ? 'Your profile is complete and visible to other students!'
                  : 'Complete your profile to connect with other students.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-600">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-400 text-center">Profile Picture</p>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture URL (Optional)
              </label>
              <input
                type="url"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Tip: Use a professional photo from LinkedIn, GitHub, or upload to a service like Imgur
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                College ID *
              </label>
              <input
                type="text"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2021CS001"
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Academic Year *
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about yourself, your goals, and what you're passionate about..."
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, Python, React, Machine Learning"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      const currentSkills = formData.skills ? formData.skills.split(', ') : [];
                      if (!currentSkills.includes(skill)) {
                        const newSkills = [...currentSkills, skill].join(', ');
                        setFormData(prev => ({ ...prev, skills: newSkills }));
                      }
                    }}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full hover:bg-purple-500/30 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Interests
            </label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="e.g., Web Development, AI, Photography, Music"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-2">Popular interests:</p>
              <div className="flex flex-wrap gap-2">
                {interestSuggestions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const currentInterests = formData.interests ? formData.interests.split(', ') : [];
                      if (!currentInterests.includes(interest)) {
                        const newInterests = [...currentInterests, interest].join(', ');
                        setFormData(prev => ({ ...prev, interests: newInterests }));
                      }
                    }}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    + {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Areas
            </label>
            <input
              type="text"
              name="projectAreas"
              value={formData.projectAreas}
              onChange={handleInputChange}
              placeholder="e.g., Mobile Apps, Machine Learning, Startups, Open Source"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfileForm;
