import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../../components/common/Button';
import { Bell, ShieldAlert, CheckCircle, Info, AlertTriangle, Trash2, CheckCheck } from 'lucide-react';

const Notifications = () => {
  const {
    notifications,
    markAllAsRead,
    markAsRead,
    clearNotifications
  } = useNotifications();

  const [filter, setFilter] = useState("all");

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.priority === filter;
  });

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'danger':
        return <ShieldAlert className="w-5 h-5 text-danger flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-primary flex-shrink-0" />;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'danger':
        return 'border-l-4 border-l-danger bg-red-50/10 border-red-200 dark:border-red-950/20';
      case 'warning':
        return 'border-l-4 border-l-warning bg-amber-50/10 border-amber-200 dark:border-amber-955/10';
      case 'success':
        return 'border-l-4 border-l-secondary bg-green-50/10 border-green-200 dark:border-green-950/10';
      default:
        return 'border-l-4 border-l-primary bg-blue-50/10 border-blue-200 dark:border-blue-950/10';
    }
  };

  return (
    <div className="flex flex-col gap-5 select-none animate-fade-in">
      
      {/* Page Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-805 dark:text-slate-100 tracking-wide uppercase">
            Notification Log Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Review critical emergency logs, IoT connectivity failures, and registration requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notifications.some(n => n.unread) && (
            <Button
              variant="outline"
              size="sm"
              icon={CheckCheck}
              onClick={markAllAsRead}
              className="text-xs font-semibold"
            >
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={clearNotifications}
              className="text-xs text-danger font-semibold"
            >
              Clear Logs
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
        {['all', 'danger', 'warning', 'success', 'info'].map((pKey) => (
          <button
            key={pKey}
            onClick={() => setFilter(pKey)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
              filter === pKey
                ? 'bg-white dark:bg-govdark-card text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-800'
                : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-200'
            }`}
          >
            {pKey}
          </button>
        ))}
      </div>

      {/* Notifications feed */}
      <div className="flex flex-col gap-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white dark:bg-govdark-card rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center flex flex-col items-center gap-2">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-700" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-305">No alarms found</span>
            <span className="text-xs text-slate-400">Everything in standard system state parameters.</span>
          </div>
        ) : (
          filteredNotifs.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 border rounded-2xl flex items-start gap-3.5 hover:shadow-sm transition-shadow cursor-pointer ${getPriorityStyle(notif.priority)} ${
                notif.unread ? 'ring-1 ring-primary/10' : 'opacity-80'
              }`}
            >
              <div className="p-1">
                {getPriorityIcon(notif.priority)}
              </div>
              
              <div className="flex-grow flex flex-col gap-1 overflow-hidden">
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-150 uppercase tracking-wide">
                    {notif.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                  {notif.message}
                </p>
              </div>

              {notif.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0 animate-pulse"></div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Notifications;
