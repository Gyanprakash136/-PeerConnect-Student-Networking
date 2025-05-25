// src/components/dashboard/ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, X, MessageCircle, Users, Phone, Video,
  Paperclip, Smile, MoreVertical, Search, Settings,
  Minimize2, Maximize2, UserPlus, Mic, MicOff,
  Image, File, MapPin, Clock, Check, CheckCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const ChatWindow = () => {
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock online users from your connections
  const mockOnlineUsers = [
    {
      id: 1,
      name: "Arjun Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      status: "online",
      lastSeen: "now",
      isTyping: false
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      status: "online",
      lastSeen: "2 min ago",
      isTyping: false
    },
    {
      id: 3,
      name: "Vikash Gupta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      status: "online",
      lastSeen: "5 min ago",
      isTyping: true
    },
    {
      id: 4,
      name: "Sneha Reddy",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face",
      status: "away",
      lastSeen: "1 hour ago",
      isTyping: false
    }
  ];

  // Mock messages for active chat
  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Arjun Sharma",
      text: "Hey! How's the hackathon preparation going?",
      timestamp: new Date(Date.now() - 300000),
      status: "read",
      type: "text"
    },
    {
      id: 2,
      senderId: "me",
      senderName: userProfile?.name || "You",
      text: "Going great! Just finished the AI model. How about your frontend?",
      timestamp: new Date(Date.now() - 240000),
      status: "read",
      type: "text"
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Arjun Sharma",
      text: "Almost done! Want to do a quick video call to sync up?",
      timestamp: new Date(Date.now() - 180000),
      status: "read",
      type: "text"
    },
    {
      id: 4,
      senderId: "me",
      senderName: userProfile?.name || "You",
      text: "Sure! Let me know when you're ready.",
      timestamp: new Date(Date.now() - 120000),
      status: "delivered",
      type: "text"
    }
  ];

  useEffect(() => {
    setOnlineUsers(mockOnlineUsers);
    if (activeChat) {
      setMessages(mockMessages);
    }
  }, [activeChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (activeChat && Math.random() > 0.7) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages, activeChat]);

  const handleSend = () => {
    if (!input.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: "me",
      senderName: userProfile?.name || "You",
      text: input.trim(),
      timestamp: new Date(),
      status: "sent",
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate reply after 2-3 seconds
    setTimeout(() => {
      const replies = [
        "That sounds great!",
        "I agree with that approach.",
        "Let me check and get back to you.",
        "Perfect! Let's proceed with that.",
        "Good idea! When can we start?",
        "I'll work on that part.",
        "Thanks for the update!"
      ];

      const replyMessage = {
        id: Date.now() + 1,
        senderId: activeChat.id,
        senderName: activeChat.name,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        status: "read",
        type: "text"
      };

      setMessages(prev => [...prev, replyMessage]);
    }, 2000 + Math.random() * 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUserSelect = (user) => {
    setActiveChat(user);
    setMessages(mockMessages);
  };

  const handleVideoCall = () => {
    if (activeChat) {
      toast.info(`Starting video call with ${activeChat.name}...`);
    }
  };

  const handleVoiceCall = () => {
    if (activeChat) {
      toast.info(`Starting voice call with ${activeChat.name}...`);
    }
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const filteredUsers = onlineUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`fixed bottom-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700/50 flex flex-col z-50 transition-all duration-300 ${
      isOpen ? (isMinimized ? 'w-80 h-12' : 'w-96 h-[600px]') : 'w-80 h-12'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800/90 px-4 py-3 rounded-t-lg border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            {onlineUsers.filter(u => u.status === 'online').length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-gray-800"></div>
            )}
          </div>
          <div>
            <span className="text-white font-semibold">
              {activeChat ? activeChat.name : 'Chat'}
            </span>
            {activeChat && (
              <div className="text-xs text-gray-400">
                {activeChat.status === 'online' ? 'Online' : `Last seen ${activeChat.lastSeen}`}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeChat && isOpen && !isMinimized && (
            <>
              <button
                onClick={handleVoiceCall}
                className="p-1.5 text-gray-400 hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={handleVideoCall}
                className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Video className="w-4 h-4" />
              </button>
            </>
          )}

          {isOpen && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-1 overflow-hidden"
          >
            {/* Sidebar - User List */}
            <div className="w-32 bg-gray-800/50 border-r border-gray-700/50 flex flex-col">
              {/* Search */}
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 bg-gray-700/50 text-white text-xs rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Online Users */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-2 py-1">
                  <div className="text-xs text-gray-400 mb-2">
                    Online ({onlineUsers.filter(u => u.status === 'online').length})
                  </div>
                  {filteredUsers.map(user => (
                    <motion.div
                      key={user.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleUserSelect(user)}
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors mb-1 ${
                        activeChat?.id === user.id ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-gray-800 ${
                          user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">
                          {user.name.split(' ')[0]}
                        </div>
                        {user.isTyping && (
                          <div className="text-xs text-blue-400">typing...</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {!activeChat ? (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center text-center p-4">
                  <div>
                    <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-gray-400 font-medium mb-1">Select a conversation</h3>
                    <p className="text-gray-500 text-sm">Choose from your connections to start chatting</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs ${msg.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-3 py-2 rounded-lg text-sm ${
                              msg.senderId === 'me'
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-gray-700 text-gray-200 rounded-bl-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className={`flex items-center space-x-1 mt-1 ${
                            msg.senderId === 'me' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-xs text-gray-500">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.senderId === 'me' && getMessageStatus(msg.status)}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-gray-700/50 p-3">
                    <div className="flex items-end space-x-2">
                      <div className="flex space-x-1">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Image className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1 relative">
                        <textarea
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          rows={1}
                          placeholder="Type a message..."
                          className="w-full resize-none bg-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          style={{ minHeight: '36px', maxHeight: '100px' }}
                        />
                      </div>

                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Smile className="w-4 h-4" />
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWindow;
