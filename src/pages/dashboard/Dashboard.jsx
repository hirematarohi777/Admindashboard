import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Stethoscope,
  Ambulance,
  UserSquare2,
  Radio,
  Clock,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Cpu,
  BellRing
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useData } from '../../contexts/DataContext';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import Input from '../../components/common/Input';

const Dashboard = () => {
  const {
    hospitals,
    medicalOfficers,
    drivers,
    ambulances,
    trafficCenters,
    emergencies,
    trips,
    auditLogs,
    health,
    triggerEmergency,
    resolveEmergency
  } = useData();

  const [simModalOpen, setSimModalOpen] = useState(false);
  const [newEmerg, setNewEmerg] = useState({
    patient: '',
    hospital: '',
    emergencyLevel: 'Red',
    ambulance: '',
    driver: ''
  });

  const activeTripsCount = emergencies.length;
  const completedTripsCount = trips.length;
  const greenCorridorsCount = emergencies.filter((e) => e.corridorType === 'Green Corridor').length;
  const blueCorridorsCount = emergencies.filter((e) => e.corridorType === 'Blue Corridor').length;
  const activeAmbulancesCount = ambulances.filter((a) => a.currentStatus === 'Active').length;
  const trafficCentersCount = trafficCenters.length;
  const systemHealthLabel = health.deviceIssuesCount === 0 ? 'Nominal' : 'Watch';
  const criticalCount = emergencies.filter((e) => e.emergencyLevel === 'Red').length;

  const statsCards = [
    {
      title: 'Hospitals',
      value: hospitals.length,
      change: '+2% this month',
      trend: 'up',
      icon: Building2,
      desc: 'Connected medical facilities',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'Medical Officers',
      value: medicalOfficers.length,
      change: '+0% this week',
      trend: 'up',
      icon: Stethoscope,
      desc: 'Licensed clinicians on duty',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      title: 'Ambulances',
      value: ambulances.length,
      change: '+1 new vehicle',
      trend: 'up',
      icon: Ambulance,
      desc: 'Tracked units and beacons',
      color: 'from-violet-500 to-fuchsia-600'
    },
    {
      title: 'Drivers',
      value: drivers.length,
      change: '+3 pending',
      trend: 'up',
      icon: UserSquare2,
      desc: 'Certified field responders',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'TMC Nodes',
      value: trafficCentersCount,
      change: '+1 regional sync',
      trend: 'up',
      icon: Radio,
      desc: 'Operational traffic management centers',
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Active Fleet',
      value: activeAmbulancesCount,
      change: `${activeAmbulancesCount} in field`,
      trend: 'up',
      icon: Ambulance,
      desc: 'Vehicles currently dispatched',
      color: 'from-rose-500 to-pink-600',
      pulse: activeAmbulancesCount > 0
    }
  ];

  const caseData = [
    { name: 'Mon', Red: 4, Yellow: 8, Green: 12 },
    { name: 'Tue', Red: 6, Yellow: 10, Green: 15 },
    { name: 'Wed', Red: 8, Yellow: 5, Green: 18 },
    { name: 'Thu', Red: 3, Yellow: 9, Green: 10 },
    { name: 'Fri', Red: 9, Yellow: 12, Green: 14 },
    { name: 'Sat', Red: 5, Yellow: 14, Green: 8 },
    { name: 'Sun', Red: 2, Yellow: 6, Green: 6 }
  ];

  const responseTimeData = [
    { time: '08:00', avgTime: 12.4, target: 15 },
    { time: '10:00', avgTime: 14.1, target: 15 },
    { time: '12:00', avgTime: 18.5, target: 15 },
    { time: '14:00', avgTime: 15.2, target: 15 },
    { time: '16:00', avgTime: 13.9, target: 15 },
    { time: '18:00', avgTime: 11.2, target: 15 },
    { time: '20:00', avgTime: 9.8, target: 15 }
  ];

  const categoryData = [
    { name: 'Cardiac Arrest', value: 35 },
    { name: 'Trauma & Accident', value: 40 },
    { name: 'Respiratory Distress', value: 15 },
    { name: 'Pediatric Emergencies', value: 10 }
  ];

  const corridorUsageData = [
    { name: 'Green Corridors', value: 65 },
    { name: 'Blue Corridors', value: 35 }
  ];

  const COLORS = ['#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#8B5CF6'];

  const handleCreateSimulation = (e) => {
    e.preventDefault();
    if (!newEmerg.patient || !newEmerg.hospital || !newEmerg.ambulance) {
      alert('Please fill in patient name, destination hospital, and select an ambulance.');
      return;
    }

    const selectedAmb = ambulances.find((a) => a.id === newEmerg.ambulance);
    const selectedDriver = selectedAmb ? selectedAmb.driver : 'Unassigned';

    triggerEmergency({
      patient: newEmerg.patient,
      hospital: newEmerg.hospital,
      emergencyLevel: newEmerg.emergencyLevel,
      ambulance: newEmerg.ambulance,
      driver: selectedDriver,
      destination: `${newEmerg.hospital} Emergency Bay 1`
    });

    setSimModalOpen(false);
    setNewEmerg({ patient: '', hospital: '', emergencyLevel: 'Red', ambulance: '', driver: '' });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 text-white shadow-[0_25px_80px_-25px_rgba(15,23,42,0.65)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_30%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-100 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Command Center Overview
            </div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Smart City Emergency Operations, tuned for fast executive oversight.
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Monitor hospital readiness, ambulance routing, corridor access, and live incident escalation from a single professional control surface.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <Cpu className="h-4 w-4 text-cyan-300" />
                Live telemetry sync
              </div>
              <div className="mt-1 text-xs text-slate-300">Last update: 12 seconds ago</div>
            </div>
            <Button
              variant="danger"
              icon={Play}
              onClick={() => setSimModalOpen(true)}
              className="font-semibold text-xs uppercase tracking-[0.2em]"
            >
              Simulate Dispatch
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {statsCards.map((card, idx) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 ${
              card.pulse ? 'ring-1 ring-red-500/50 dark:ring-red-500/50' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{card.title}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">{card.value}</span>
                  <span className={`inline-flex items-center text-[10px] font-bold ${card.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {card.trend === 'up' ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                    {card.change}
                  </span>
                </div>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
            {idx === 0 && (
              <div className="mt-4 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Response Time</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Average dispatch performance over the last 24 hours</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              Target: &lt;15 min
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="m" />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="avgTime" name="Response Time" stroke="#2563EB" strokeWidth={3} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="target" name="Target Boundary" stroke="#DC2626" strokeDasharray="5 5" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">System Health</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Infrastructure resilience snapshot</p>
              </div>
              <div className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                {systemHealthLabel}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Overall Connectivity', value: health.overallHealth, color: 'from-emerald-500 to-green-600' },
                { label: 'GPS Stability', value: health.gpsConnectivity, color: 'from-blue-500 to-cyan-500' },
                { label: 'LoRa Gateway', value: health.loraConnectivity, color: 'from-amber-500 to-orange-500' },
                { label: 'Traffic Signals', value: health.trafficSignalHealth, color: 'from-violet-500 to-indigo-500' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Priority Incidents</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Current high-risk operations</p>
              </div>
              <div className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                {criticalCount} Critical
              </div>
            </div>
            <div className="space-y-3">
              {emergencies.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No active critical emergency operations.
                </div>
              ) : (
                emergencies.slice(0, 3).map((emerg) => (
                  <div key={emerg.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${emerg.emergencyLevel === 'Red' ? 'bg-rose-500' : emerg.emergencyLevel === 'Yellow' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{emerg.id}</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{emerg.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{emerg.patient}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                      {emerg.hospital}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr_0.8fr] gap-6">
        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Emergency Trend</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Daily incident volume by severity</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Last 7 days
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Red" stackId="a" fill="#DC2626" />
                <Bar dataKey="Yellow" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Green" stackId="a" fill="#16A34A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Category Mix</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Share of the current incident pool</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="45%" innerRadius={58} outerRadius={82} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Corridor Usage</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Preemptive traffic lane access</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={corridorUsageData} cx="50%" cy="45%" innerRadius={0} outerRadius={80} label dataKey="value">
                  <Cell fill="#16A34A" />
                  <Cell fill="#2563EB" />
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Operational Timeline</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Recent administrative activity</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Live feed
            </div>
          </div>
          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                  <BellRing className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{log.action}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{log.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{log.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_55px_-25px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-800 dark:text-slate-100">Quick Actions</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Common administrative controls</p>
            </div>
          </div>
          <div className="grid gap-3">
            <Button variant="outline" size="sm" onClick={() => alert('Simulating overall traffic control grid override: Synchronizing all 24 downtown signal corridors.')} className="justify-start text-xs font-semibold">
              Override Signal Grid
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert('Alert broadcast dispatched to all active ambulance drivers (4 units) to switch radios to channel 12-A.')} className="justify-start text-xs font-semibold">
              Broadcast Voice Alert
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert('Device diagnostic check launched on 5 ambulance systems. All hardware verified healthy.')} className="justify-start text-xs font-semibold">
              Ping Fleet Beacons
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert('Simulation DB Snapshot complete. Saved locally as snapshot-admin-2026-07-13.json')} className="justify-start text-xs font-semibold">
              Backup EOC Registry
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={simModalOpen}
        onClose={() => setSimModalOpen(false)}
        title="Simulate Critical Emergency Dispatch"
        size="md"
      >
        <form onSubmit={handleCreateSimulation} className="flex flex-col gap-4">
          <Input
            label="Patient Name & Condition"
            type="text"
            required
            placeholder="e.g. Tony Stark (Chest Pain)"
            value={newEmerg.patient}
            onChange={(e) => setNewEmerg({ ...newEmerg, patient: e.target.value })}
          />

          <Input
            label="Destination Hospital"
            type="select"
            required
            value={newEmerg.hospital}
            onChange={(e) => setNewEmerg({ ...newEmerg, hospital: e.target.value })}
            options={hospitals.filter((h) => h.status === 'Active').map((h) => ({
              value: h.name,
              label: h.name
            }))}
            placeholder="Select hospital..."
          />

          <Input
            label="Emergency Priority Level"
            type="select"
            required
            value={newEmerg.emergencyLevel}
            onChange={(e) => setNewEmerg({ ...newEmerg, emergencyLevel: e.target.value })}
            options={[
              { value: 'Red', label: 'RED - High Critical (Cardiac, Trauma)' },
              { value: 'Yellow', label: 'YELLOW - Urgent Care' },
              { value: 'Green', label: 'GREEN - Non-Urgent Transport' }
            ]}
          />

          <Input
            label="Ambulance & Telemetry Beacon"
            type="select"
            required
            value={newEmerg.ambulance}
            onChange={(e) => setNewEmerg({ ...newEmerg, ambulance: e.target.value })}
            options={ambulances.filter((a) => a.currentStatus === 'Available').map((a) => ({
              value: a.id,
              label: `${a.id} (${a.vehicleNumber}) - Driver: ${a.driver}`
            }))}
            placeholder="Select available ambulance..."
          />

          <div className="mt-4 flex w-full items-center gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setSimModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" type="submit" className="flex-1 font-semibold">
              Dispatch Now
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
