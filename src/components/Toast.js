// components/Toast.js
import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success' }) => {
  const icons = {
    success: CheckCircle,
    info: Info,
    warning: AlertCircle,
    error: AlertCircle
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const Icon = icons[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg ${colors[type]}`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
