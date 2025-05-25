// components/MyConnections.js
import React from 'react';
import { Users, User, MessageCircle, Mail } from 'lucide-react';

const MyConnections = ({ connections }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">My Connections</h2>
        </div>
        <div className="text-sm text-gray-500">
          {connections.length} connection{connections.length !== 1 ? 's' : ''}
        </div>
      </div>

      {connections.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No connections yet</h3>
          <p className="text-gray-500 mb-6">Start connecting with fellow students to build your network!</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Browse the "Browse Students" tab to discover peers with similar interests and send connection requests.
            </p>
          </div>
        </div>
      ) : (
        /* Connections Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map(connection => (
            <div key={connection.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{connection.name}</h3>
                    <p className="text-gray-600 text-sm">{connection.year}</p>
                    <p className="text-gray-500 text-sm">{connection.department}</p>
                  </div>
                </div>

                {/* Bio */}
                {connection.bio && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{connection.bio}</p>
                )}

                {/* Shared Interests/Skills */}
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Interests</span>
                    <p className="text-sm text-gray-700">{connection.interests}</p>
                  </div>
                  {connection.projectAreas && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project Areas</span>
                      <p className="text-sm text-gray-700">{connection.projectAreas}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connection Stats */}
      {connections.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Network Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{connections.length}</div>
              <div className="text-sm text-gray-500">Total Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {new Set(connections.map(c => c.department)).size}
              </div>
              <div className="text-sm text-gray-500">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(connections.map(c => c.year)).size}
              </div>
              <div className="text-sm text-gray-500">Year Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {connections.filter(c => c.projectAreas).length}
              </div>
              <div className="text-sm text-gray-500">Project Partners</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConnections;
