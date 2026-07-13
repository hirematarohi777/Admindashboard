import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import { List, Clock, ShieldAlert } from 'lucide-react';

const AuditLog = () => {
  const { auditLogs } = useData();
  const [viewMode, setViewMode] = useState("table"); // table or timeline

  const columns = [
    { header: "Log ID", accessor: "id", sortable: true },
    { header: "Operator", accessor: "user", sortable: true, filterable: true },
    { header: "Action Executed", accessor: "action", sortable: true, filterable: true },
    { header: "Module", accessor: "module", sortable: true, filterable: true },
    { header: "Record Link ID", accessor: "recordId" },
    { header: "Date", accessor: "date", sortable: true },
    { header: "Time", accessor: "time" },
    { header: "IP Address", accessor: "ipAddress" },
    { header: "Reason Logs", accessor: "reason" },
    {
      header: "Status",
      accessor: "status",
      filterable: true,
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
          val === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-red-100 text-red-750'
        }`}>
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5 select-none animate-fade-in">
      
      {/* Page Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-805 dark:text-slate-100 tracking-wide uppercase">
            Security & Operations Audit Logs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Review security-critical operations, system configurations revisions, and verify credentials approvals.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-205 dark:border-slate-805">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              viewMode === 'table' 
                ? 'bg-white dark:bg-govdark-card text-slate-850 dark:text-slate-105 shadow-sm' 
                : 'text-slate-500'
            }`}
          >
            <List className="w-3.5 h-3.5" /> Table View
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              viewMode === 'timeline' 
                ? 'bg-white dark:bg-govdark-card text-slate-805 dark:text-slate-105 shadow-sm' 
                : 'text-slate-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Timeline View
          </button>
        </div>
      </div>

      {/* Main Grid display */}
      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        {viewMode === 'table' ? (
          <ReusableTable
            columns={columns}
            data={auditLogs}
            searchPlaceholder="Search audit events by operator, IP, actions, log ID..."
            defaultSortField="id"
          />
        ) : (
          // Timeline view
          <div className="flex flex-col gap-6 max-w-2xl mx-auto py-4">
            {auditLogs.map((log, idx) => (
              <div key={log.id || idx} className="flex gap-4 relative pb-5 border-l border-slate-200 dark:border-slate-800 pl-6 ml-3 last:border-l-0">
                
                {/* Node Icon */}
                <div className="absolute -left-3.5 top-0.5 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary ring-4 ring-white dark:ring-govdark-card shadow-sm">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 flex flex-col gap-1.5 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <div className="flex justify-between items-baseline gap-4 flex-wrap">
                    <span className="text-xs font-black text-slate-805 dark:text-slate-100">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{log.date} at {log.time}</span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>Operator: {log.user}</span>
                    <span>•</span>
                    <span>Module: {log.module}</span>
                    <span>•</span>
                    <span>IP: {log.ipAddress}</span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed pl-0.5">
                    {log.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AuditLog;
