import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  UserSquare2,
  Ambulance,
  Radio,
  Tv,
  AlertOctagon,
  Milestone,
  Map,
  Bell,
  BarChart3,
  History,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  useLocation();
  const { emergencies } = useData();
  const [userMenuOpen, setUserMenuOpen] = useState(true);

  const activeEmergenciesCount = emergencies.filter(e => e.emergencyLevel === 'Red').length;

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
      isActive
        ? 'bg-primary text-white shadow-glow-primary'
        : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-850 dark:hover:text-slate-100'
    }`;

  const subNavItemClass = ({ isActive }) =>
    `flex items-center gap-3 pl-11 pr-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 select-none ${
      isActive
        ? 'bg-primary/10 text-primary dark:text-primary-light font-semibold'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200'
    }`;

  const userManagementItems = [
    { to: '/hospitals', icon: Building2, label: 'Hospitals' },
    { to: '/medical-officers', icon: Stethoscope, label: 'Medical Officers' },
    { to: '/drivers', icon: UserSquare2, label: 'Drivers' },
    { to: '/ambulances', icon: Ambulance, label: 'Ambulances' },
    { to: '/traffic-centers', icon: Radio, label: 'Traffic Centers' }
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-white dark:bg-govdark-card border-slate-200 dark:border-slate-800 h-full overflow-hidden"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 text-white font-bold shadow-glow-primary flex-shrink-0">
            SC
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-white dark:border-govdark-card animate-pulse-green"></div>
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col whitespace-nowrap"
              >
                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-wide">
                  SMART CITY EOC
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  System Admin
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg border border-slate-250 dark:border-slate-850 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1.5 scrollbar-thin">
        {/* Toggle Collapse Button on Collapsed State */}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center p-3 mb-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Dashboard Link */}
        <NavLink to="/" end className={navItemClass}>
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        {/* User Management Accordion */}
        <div className="flex flex-col">
          {isCollapsed ? (
            <div className="flex flex-col gap-1">
              <NavLink to="/hospitals" className={navItemClass} title="User Management">
                <Users className="w-5 h-5 flex-shrink-0" />
              </NavLink>
              {userManagementItems.slice(1).map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-center rounded-xl p-2.5 transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200'
                      }`
                    }
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <>
              <button
                onClick={() => setUserMenuOpen(prev => !prev)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 select-none text-slate-650 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-850 dark:hover:text-slate-100`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-450" />
                  <span>User Management</span>
                </div>
                {userMenuOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 mt-1"
                  >
                    {userManagementItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink key={item.to} to={item.to} className={subNavItemClass}>
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-2"></div>

        {/* Live Monitoring */}
        <NavLink to="/live-monitoring" className={navItemClass}>
          <Tv className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Live Monitoring</span>}
        </NavLink>

        {/* Emergency Monitoring */}
        <NavLink to="/emergency-monitoring" className={navItemClass}>
          <div className="relative">
            <AlertOctagon className="w-5 h-5 flex-shrink-0" />
            {activeEmergenciesCount > 0 && isCollapsed && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-govdark-card animate-pulse-red">
                {activeEmergenciesCount}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Emergency Monitoring</span>
              {activeEmergenciesCount > 0 && (
                <span className="px-2 py-0.5 bg-danger text-white text-xs font-bold rounded-full animate-pulse-red">
                  {activeEmergenciesCount} Active
                </span>
              )}
            </div>
          )}
        </NavLink>

        {/* Trip Monitoring */}
        <NavLink to="/trip-monitoring" className={navItemClass}>
          <Milestone className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Trip Monitoring</span>}
        </NavLink>

        {/* Notifications & Alerts */}

        <NavLink to="/notifications" className={navItemClass}>
          <Bell className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Notifications & Alerts</span>}
        </NavLink>

        {/* Reports & Analytics */}
        <NavLink to="/analytics" className={navItemClass}>
          <BarChart3 className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Reports & Analytics</span>}
        </NavLink>

        {/* Audit Logs */}
        <NavLink to="/audit-log" className={navItemClass}>
          <History className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Audit Logs</span>}
        </NavLink>

        {/* System Configuration */}
        <NavLink to="/settings" className={navItemClass}>
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>System Configuration</span>}
        </NavLink>
      </div>

      {/* Footer / Profile Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex-shrink-0 flex flex-col gap-2">
        <NavLink to="/profile" className={navItemClass}>
          <User className="w-5 h-5 flex-shrink-0 text-slate-450" />
          {!isCollapsed && (
            <div className="flex flex-col text-left overflow-hidden">
              <span className="font-semibold text-slate-850 dark:text-slate-100 truncate text-xs">Admin Chief</span>
              <span className="text-[10px] text-slate-400 truncate">rohi2@smartcity.gov</span>
            </div>
          )}
        </NavLink>

        <button
          type="button"
          onClick={() => alert('Logout simulated for the system admin console.')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 select-none text-slate-650 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-850 dark:hover:text-slate-100 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
