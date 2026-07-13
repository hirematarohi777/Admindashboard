import React from 'react';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import { AlertOctagon, Heart, Radio, Zap, Check } from 'lucide-react';

const EmergencyMonitoring = () => {
  const { emergencies, resolveEmergency, updateEmergencyCorridor } = useData();

  // Metrics
  const activeRedCount = emergencies.filter(e => e.emergencyLevel === 'Red').length;
  const activeYellowCount = emergencies.filter(e => e.emergencyLevel === 'Yellow').length;
  const activeGreenCount = emergencies.filter(e => e.emergencyLevel === 'Green').length;
  const greenCorridors = emergencies.filter(e => e.corridorType === 'Green Corridor').length;
  const blueCorridors = emergencies.filter(e => e.corridorType === 'Blue Corridor').length;

  const columns = [
    { header: "Emergency ID", accessor: "id", sortable: true },
    { header: "Ambulance", accessor: "ambulance", sortable: true },
    { header: "Driver", accessor: "driver", sortable: true },
    { header: "Patient & Condition", accessor: "patient", sortable: true },
    { header: "Destination Hospital", accessor: "hospital", sortable: true, filterable: true },
    {
      header: "Level",
      accessor: "emergencyLevel",
      filterable: true,
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
          val === 'Red'
            ? 'bg-red-100 text-red-700 dark:bg-red-955/35 dark:text-danger-light animate-pulse-red'
            : val === 'Yellow'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-955/30 dark:text-warning-light'
            : 'bg-green-105 text-green-700 dark:bg-green-950/40 dark:text-green-400'
        }`}>
          {val}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      filterable: true,
      render: (val) => (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {val}
        </span>
      )
    },
    { header: "ETA", accessor: "eta" },
    { header: "Elapsed Time", accessor: "timeElapsed" },
    {
      header: "Corridor Type",
      accessor: "corridorType",
      filterable: true,
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
          val === 'Green Corridor'
            ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 font-extrabold animate-pulse'
            : val === 'Blue Corridor'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-955/20 dark:text-blue-400 font-extrabold'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {val}
        </span>
      )
    }
  ];

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <select
          value={row.corridorType}
          onChange={(e) => updateEmergencyCorridor(row.id, e.target.value)}
          className="px-2 py-1 text-[10px] rounded-lg border border-slate-300 dark:border-slate-750 bg-white dark:bg-govdark-card text-slate-700 dark:text-slate-350 focus:outline-none"
        >
          <option value="None">No Corridor</option>
          <option value="Green Corridor">Green Corridor</option>
          <option value="Blue Corridor">Blue Corridor</option>
        </select>
        
        <Button
          variant="success"
          size="xs"
          icon={Check}
          onClick={() => resolveEmergency(row.id)}
          className="font-semibold"
        >
          Resolve
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
          Emergency Command Room Feed
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Real-time incident response routing center. Overwrite signal priorities to clear pathways.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 select-none">
        
        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col gap-1 shadow-sm">
          <AlertOctagon className="w-5 h-5 text-danger" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Active RED</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{activeRedCount}</span>
        </div>

        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-855 rounded-2xl flex flex-col gap-1 shadow-sm">
          <AlertOctagon className="w-5 h-5 text-warning" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Active YELLOW</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{activeYellowCount}</span>
        </div>

        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-855 rounded-2xl flex flex-col gap-1 shadow-sm">
          <AlertOctagon className="w-5 h-5 text-secondary" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Active GREEN</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{activeGreenCount}</span>
        </div>

        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-855 rounded-2xl flex flex-col gap-1 shadow-sm">
          <Zap className="w-5 h-5 text-secondary animate-pulse" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Green Corridors</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{greenCorridors}</span>
        </div>

        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-855 rounded-2xl flex flex-col gap-1 shadow-sm">
          <Radio className="w-5 h-5 text-primary" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Blue Corridors</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{blueCorridors}</span>
        </div>

        <div className="p-4 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-855 rounded-2xl flex flex-col gap-1 shadow-sm">
          <Heart className="w-5 h-5 text-primary" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Avg Response</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">11.4m</span>
        </div>

      </div>

      {/* Emergency Logs Table */}
      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={emergencies}
          actions={renderActions}
          searchPlaceholder="Search active emergencies by ID, patient, vehicle, hospital..."
          defaultSortField="id"
        />
      </div>

    </div>
  );
};

export default EmergencyMonitoring;
