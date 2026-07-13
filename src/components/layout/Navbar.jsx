import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Sun,
  Moon,
  Search,
  User,
  Settings,
  History,
  LogOut,
  Menu,
  Clock,
  Calendar,
  Check
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';

const Navbar = ({ toggleSidebarCollapse }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Ticking Time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  // Close dropdowns on outside click
  useEffect(() => {
    const closeDropdowns = () => {
      setProfileOpen(false);
      setNotifOpen(false);
    };
    window.addEventListener('click', closeDropdowns);
    return () => window.removeEventListener('click', closeDropdowns);
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-govdark-card/85 backdrop-blur-md flex items-center justify-between px-6 select-none">
      
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); toggleSidebarCollapse(); }}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden lg:flex flex-col">
          <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Smart City Emergency Management Platform
          </h1>
          <span className="text-[10px] text-slate-450 dark:text-slate-400 font-semibold tracking-wider">
            FEDERAL CONTROL ROOM PORTAL
          </span>
        </div>
      </div>

      {/* Middle: Search & Live Clock */}
      <div className="hidden lg:flex items-center gap-3 flex-1 max-w-xl ml-4">
        <div className="flex items-center w-full gap-2 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, alerts, incidents..."
            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-5 px-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-650 dark:text-slate-350">
        <div className="flex items-center gap-1.5 font-medium border-r border-slate-250 dark:border-slate-750 pr-4">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-mono tabular-nums">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Right: Actions (Search, Notification, Theme, Profile) */}
      <div className="flex items-center gap-3">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Color Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setNotifOpen(prev => !prev); setProfileOpen(false); }}
            className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 text-slate-550 dark:text-slate-350 hover:bg-slate-550/5 dark:hover:bg-slate-800 transition-all ${
              unreadCount > 0 ? 'bg-primary/5 border-primary/20 text-primary' : ''
            }`}
          >
            <div className="relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-govdark-card animate-pulse-red">
                  {unreadCount}
                </span>
              )}
            </div>
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-govdark-card border border-slate-250 dark:border-slate-800 rounded-2xl shadow-glass-light dark:shadow-glass-dark overflow-hidden animate-slide-up select-none">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-100">Live Alerts</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] text-primary dark:text-primary-light hover:underline font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-3.5 flex flex-col gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer ${
                        notif.unread ? 'bg-slate-50/50 dark:bg-slate-850/10' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          notif.priority === 'danger' ? 'text-danger' : notif.priority === 'warning' ? 'text-warning' : notif.priority === 'success' ? 'text-secondary' : 'text-primary'
                        }`}>
                          {notif.type}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-705 dark:text-slate-300 font-medium leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <Link
                to="/notifications"
                onClick={() => setNotifOpen(false)}
                className="block text-center py-2.5 text-xs text-primary dark:text-primary-light hover:underline font-semibold bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setProfileOpen(prev => !prev); setNotifOpen(false); }}
            className="flex items-center gap-2.5 p-1 pr-3.5 rounded-xl border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-650 text-white font-bold flex items-center justify-center shadow-md">
              A
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-750 dark:text-slate-200">Admin</span>
              <span className="text-[9px] text-slate-450">Active Duty</span>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-glass-light dark:shadow-glass-dark py-2 animate-slide-up select-none">
              <Link
                to="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User className="w-4 h-4" /> Edit Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Settings className="w-4 h-4" /> System Settings
              </Link>
              <Link
                to="/audit-log"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <History className="w-4 h-4" /> System Logs
              </Link>
              <div className="h-px bg-slate-150 dark:bg-slate-800 my-1"></div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logged out of Smart City EOC (Demonstration Only).");
                }}
                className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
