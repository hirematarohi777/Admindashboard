import React from 'react';
import { useData } from '../../contexts/DataContext';
import {
  Cpu,
  Compass,
  Radio,
  Video,
  Volume2,
  Bell,
  Plug,
  Battery,
  Signal,
  MapPin,
  Activity
} from 'lucide-react';

const LiveMonitoring = () => {
  const { ambulances, hospitals, emergencies } = useData();

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
          Live IoT Sensors & Telemetry Grid
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Real-time status broadcast from active ESP32 microcontroller nodes, siren relays, and GIS tracking transponders.
        </p>
      </div>

      {/* Grid Layout: Active Fleet Sensor Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ambulances.map((amb) => {
          const isVehicleActive = amb.currentStatus === 'Active';
          const isVehicleOnline = amb.gpsStatus === 'Online';
          
          return (
            <div
              key={amb.id}
              className={`rounded-2xl border bg-white dark:bg-govdark-card p-5 flex flex-col gap-4 shadow-sm transition-all duration-300 relative overflow-hidden ${
                isVehicleActive 
                  ? 'border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.15)] ring-1 ring-red-500/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Animated scanning radar in background for active units */}
              {isVehicleActive && (
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-red-500/10 rounded-full animate-ping pointer-events-none"></div>
              )}

              {/* Title & Status */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl text-white ${
                    isVehicleActive ? 'bg-danger animate-pulse-red' : 'bg-primary'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{amb.id}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{amb.vehicleNumber}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${
                    amb.currentStatus === 'Available'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                      : amb.currentStatus === 'Active'
                      ? 'bg-red-100 text-red-750 dark:bg-red-950/40 dark:text-red-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-955/20 dark:text-warning-light'
                  }`}>
                    {amb.currentStatus.toUpperCase()}
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold mt-1">Driver: {amb.driver}</span>
                </div>
              </div>

              {/* Hardware Sensors Status */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-100 dark:border-slate-800/80 py-3 text-[10px] font-bold select-none">
                
                {/* GPS */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Compass className={`w-3.5 h-3.5 ${isVehicleOnline ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">GPS</span>
                  <span className={isVehicleOnline ? 'text-secondary' : 'text-danger'}>
                    {amb.deviceHealth.gps.toUpperCase()}
                  </span>
                </div>

                {/* LoRa */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Radio className={`w-3.5 h-3.5 ${amb.loraStatus === 'Online' ? 'text-purple-500' : 'text-slate-400'}`} />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">LoRa</span>
                  <span className={amb.loraStatus === 'Online' ? 'text-secondary' : 'text-danger'}>
                    {amb.deviceHealth.lora.toUpperCase()}
                  </span>
                </div>

                {/* ESP32 */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">ESP32</span>
                  <span className={amb.deviceHealth.esp32 === 'Healthy' ? 'text-secondary' : 'text-danger'}>
                    {amb.deviceHealth.esp32.toUpperCase()}
                  </span>
                </div>

                {/* Camera */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Video className={`w-3.5 h-3.5 ${amb.deviceHealth.camera === 'Healthy' ? 'text-cyan-500' : 'text-slate-400'}`} />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">CCTV</span>
                  <span className={amb.deviceHealth.camera === 'Healthy' ? 'text-secondary' : 'text-danger'}>
                    {amb.deviceHealth.camera.toUpperCase()}
                  </span>
                </div>

                {/* Buzzer */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Volume2 className={`w-3.5 h-3.5 ${amb.deviceHealth.buzzer === 'Active' ? 'text-primary animate-bounce' : 'text-slate-400'}`} />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">Buzzer</span>
                  <span className={amb.deviceHealth.buzzer === 'Active' ? 'text-primary' : 'text-slate-400'}>
                    {amb.deviceHealth.buzzer.toUpperCase()}
                  </span>
                </div>

                {/* Siren */}
                <div className="flex flex-col gap-0.5 items-center justify-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-center">
                  <Bell className={`w-3.5 h-3.5 ${amb.deviceHealth.siren === 'Active' ? 'text-danger animate-pulse' : 'text-slate-400'}`} />
                  <span className="text-slate-400 text-[8px] uppercase mt-0.5">Siren</span>
                  <span className={amb.deviceHealth.siren === 'Active' ? 'text-danger' : 'text-slate-400'}>
                    {amb.deviceHealth.siren.toUpperCase()}
                  </span>
                </div>

              </div>

              {/* Power & Network Signal strength */}
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-650 dark:text-slate-350 select-none">
                <div className="flex items-center gap-1">
                  <Plug className="w-3.5 h-3.5 text-slate-400" />
                  <span>{amb.deviceHealth.power}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <Battery className={`w-3.5 h-3.5 ${amb.deviceHealth.battery < 20 ? 'text-danger animate-pulse' : 'text-secondary'}`} />
                    <span>{amb.deviceHealth.battery}%</span>
                  </div>
                  
                  <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-800"></div>

                  <div className="flex items-center gap-0.5">
                    <Signal className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono">{amb.deviceHealth.signalStrength} dBm</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Hospital Occupancy Sensor Feeds & Corridor Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hospital Occupancy Stats */}
        <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-805 dark:text-slate-100 uppercase border-b border-slate-205 dark:border-slate-805 pb-3">
            Hospital Bed Sensor Feeds
          </h3>

          <div className="flex flex-col gap-3.5">
            {hospitals.map(h => {
              const bedRatio = h.bedsAvailable > 0 ? (h.bedsAvailable / 50) * 100 : 0;
              return (
                <div key={h.id} className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-baseline font-semibold text-slate-700 dark:text-slate-300">
                    <span>{h.name}</span>
                    <span>{h.bedsAvailable} Beds Available</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        bedRatio > 50 ? 'bg-secondary' : bedRatio > 20 ? 'bg-warning' : 'bg-danger'
                      }`}
                      style={{ width: `${bedRatio}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Smart Intersection Corridor status */}
        <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-805 dark:text-slate-100 uppercase border-b border-slate-205 dark:border-slate-805 pb-3">
            Traffic Corridor Preemption Link
          </h3>

          <div className="flex flex-col gap-3">
            {emergencies.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No active preemption signals triggered. All signals in Standard Cycle.
              </div>
            ) : (
              emergencies.map(e => (
                <div key={e.id} className="p-3 border border-slate-205 dark:border-slate-805 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-805 dark:text-slate-200">{e.id}</span>
                      <span className={`text-[10px] font-black uppercase ${
                        e.emergencyLevel === 'Red' ? 'text-danger' : 'text-warning'
                      }`}>{e.emergencyLevel} Priority</span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" /> {e.hospital}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold ${
                      e.corridorType === 'Green Corridor'
                        ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 animate-pulse-green'
                        : e.corridorType === 'Blue Corridor'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-955/20 dark:text-blue-400'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {e.corridorType === 'None' ? 'NO PREEMPTION' : e.corridorType.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default LiveMonitoring;
