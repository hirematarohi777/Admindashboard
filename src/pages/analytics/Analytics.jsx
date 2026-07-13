import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../../components/common/Button';
import { FileDown, BarChart3, TrendingUp, Sparkles, Printer } from 'lucide-react';

const Analytics = () => {
  const { addToast } = useNotifications();
  const [timeRange, setTimeRange] = useState("weekly");
  const [isExporting, setIsExporting] = useState(false);

  // Performance datasets
  const hospitalPerformanceData = [
    { name: 'Metro General', HandoverMins: 9.2, Admissions: 44 },
    { name: 'St. Jude Trauma', HandoverMins: 11.5, Admissions: 30 },
    { name: 'Valley Pediatrics', HandoverMins: 8.0, Admissions: 22 },
    { name: 'Apex Cardiology', HandoverMins: 14.1, Admissions: 12 },
  ];

  const driverPerformanceData = [
    { name: 'John Miller', trips: 14, timeSavedMins: 72 },
    { name: 'Robert Chen', trips: 10, timeSavedMins: 45 },
    { name: 'Michael Porter', trips: 8, timeSavedMins: 15 },
  ];

  const greenCorridorData = [
    { week: 'W1', clearanceSecs: 45, standardDelaySecs: 180 },
    { week: 'W2', clearanceSecs: 30, standardDelaySecs: 180 },
    { week: 'W3', clearanceSecs: 22, standardDelaySecs: 180 },
    { week: 'W4', clearanceSecs: 25, standardDelaySecs: 180 },
  ];

  const handleExport = (format) => {
    setIsExporting(true);
    addToast("Generating Report Bundle", `Compiling Smart City analytics database into ${format}...`, 'info');
    setTimeout(() => {
      setIsExporting(false);
      addToast("Report Ready for Download", `Success! EOC-Report-Summary.${format === 'print' ? 'pdf' : format} generated.`, 'success');
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fade-in">
      
      {/* Page Title */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-805 dark:text-slate-100 tracking-wide uppercase">
            Platform Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Review detailed graphs on hospital handover delays, driver routes, and preemption corridor effectiveness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Printer}
            onClick={() => handleExport('print')}
            isDisabled={isExporting}
          >
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={FileDown}
            onClick={() => handleExport('pdf')}
            isDisabled={isExporting}
          >
            Export PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={FileDown}
            onClick={() => handleExport('xlsx')}
            isDisabled={isExporting}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Date Select Panel */}
      <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-205 dark:border-slate-805 self-start">
        <button
          onClick={() => setTimeRange("daily")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
            timeRange === 'daily'
              ? 'bg-white dark:bg-govdark-card text-slate-850 dark:text-slate-105 shadow-sm border'
              : 'text-slate-500'
          }`}
        >
          Daily View
        </button>
        <button
          onClick={() => setTimeRange("weekly")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
            timeRange === 'weekly'
              ? 'bg-white dark:bg-govdark-card text-slate-850 dark:text-slate-105 shadow-sm border'
              : 'text-slate-500'
          }`}
        >
          Weekly View
        </button>
        <button
          onClick={() => setTimeRange("monthly")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
            timeRange === 'monthly'
              ? 'bg-white dark:bg-govdark-card text-slate-850 dark:text-slate-105 shadow-sm border'
              : 'text-slate-500'
          }`}
        >
          Monthly View
        </button>
      </div>

      {/* Graphs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hospital Performance Chart */}
        <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
              Hospital Admission & Handover Times
            </h3>
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hospitalPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-slate-850" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="HandoverMins" name="Handover Lag (Mins)" fill="#DC2626" />
                <Bar dataKey="Admissions" name="Total Admissions" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Performance Chart */}
        <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
              Ambulance Drivers Efficiency Index
            </h3>
            <TrendingUp className="w-4 h-4 text-secondary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driverPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-slate-850" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="trips" name="Completed Emergency Trips" fill="#2563EB" stroke="#2563EB" fillOpacity={0.1} />
                <Area type="monotone" dataKey="timeSavedMins" name="Clearance Time Saved (Mins)" fill="#16A34A" stroke="#16A34A" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Green Corridor Performance Chart */}
        <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-warning animate-pulse" /> Green Corridor Preemption Delay Savings
            </h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Intersection delay in seconds</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={greenCorridorData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:stroke-slate-850" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="clearanceSecs" name="Green Corridor Delay" stroke="#16A34A" strokeWidth={3} />
                <Line type="monotone" dataKey="standardDelaySecs" name="Standard Intersections Delay" stroke="#DC2626" strokeDasharray="5 5" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;
