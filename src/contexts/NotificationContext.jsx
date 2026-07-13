import React, { createContext, useContext, useState } from 'react';
import { mockNotifications } from '../data/mockData';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString();
    const newToast = { id, title, message, type };
    
    // Add to toasts stack
    setToasts(prev => [...prev, newToast]);
    
    // Automatically add to global notification archive
    const newNotif = {
      id: `NOTIF-${id}`,
      type: title,
      title: title,
      message: message,
      timestamp: "Just Now",
      priority: type === 'danger' ? 'danger' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info',
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Auto dismiss toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      unreadCount,
      addToast,
      removeToast,
      markAllAsRead,
      markAsRead,
      clearNotifications
    }}>
      {children}
      {/* Toast Render Component */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`cursor-pointer p-4 rounded-xl shadow-lg flex flex-col gap-1 border animate-slide-in-right glassmorphism border-l-4 transition-all duration-300 transform hover:scale-[1.02] ${
              toast.type === 'danger'
                ? 'border-l-danger border-danger-light/20 text-slate-800 dark:text-slate-100'
                : toast.type === 'success'
                ? 'border-l-secondary border-secondary-light/20 text-slate-800 dark:text-slate-100'
                : toast.type === 'warning'
                ? 'border-l-warning border-warning-light/20 text-slate-800 dark:text-slate-100'
                : 'border-l-primary border-primary-light/20 text-slate-800 dark:text-slate-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-sm">{toast.title}</span>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs ml-2">
                &times;
              </button>
            </div>
            <p className="text-xs opacity-90">{toast.message}</p>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
