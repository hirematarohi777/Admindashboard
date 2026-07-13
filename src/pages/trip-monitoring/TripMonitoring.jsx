import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import { Eye, Play, Download, MapPin, Compass, Fuel, Sparkles } from 'lucide-react';

const TripMonitoring = () => {
  const { trips } = useData();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [playbackModalOpen, setPlaybackModalOpen] = useState(false);
  const [animatingIndex, setAnimatingIndex] = useState(0);

  // Playback timer loop
  useEffect(() => {
    let interval;
    if (playbackModalOpen && selectedTrip && selectedTrip.route) {
      setAnimatingIndex(0);
      interval = setInterval(() => {
        setAnimatingIndex(prev => {
          if (prev >= selectedTrip.route.length - 1) {
            return 0; // Loop back
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [playbackModalOpen, selectedTrip]);

  const columns = [
    { header: "Trip ID", accessor: "id", sortable: true },
    { header: "Driver Name", accessor: "driverName", sortable: true },
    { header: "Ambulance", accessor: "ambulanceId", sortable: true, filterable: true },
    { header: "Hospital Attached", accessor: "hospital", sortable: true, filterable: true },
    { header: "Pickup Location", accessor: "pickupLocation" },
    {
      header: "Priority",
      accessor: "emergencyLevel",
      filterable: true,
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
          val === 'Red' ? 'text-danger' : val === 'Yellow' ? 'text-warning' : 'text-secondary'
        }`}>
          {val}
        </span>
      )
    },
    { header: "Start Time", accessor: "startTime" },
    { header: "Arrival Time", accessor: "arrivalTime" },
    { header: "Distance", accessor: "distanceTravelled" },
    { header: "Time Saved", accessor: "timeSaved" },
    {
      header: "Status",
      accessor: "tripStatus",
      filterable: true,
      render: (val) => (
        <span className="px-2.5 py-1 bg-slate-105 text-slate-700 dark:bg-slate-800 dark:text-slate-350 rounded-full text-xs font-bold">
          {val}
        </span>
      )
    }
  ];

  const handleDownload = (tripId) => {
    alert(`Downloading EOC Trip Log File for: ${tripId} (PDF/CSV Mock format).`);
  };

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="outline"
          size="xs"
          icon={Eye}
          onClick={() => { setSelectedTrip(row); setViewModalOpen(true); }}
        />
        <Button
          variant="secondary"
          size="xs"
          icon={Play}
          onClick={() => { setSelectedTrip(row); setPlaybackModalOpen(true); }}
        />
        <Button
          variant="outline"
          size="xs"
          icon={Download}
          onClick={() => handleDownload(row.id)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Historical Emergency Trips
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Inspect trip trajectories, distance records, fuel consumption figures, and corridor efficiency.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={trips}
          actions={renderActions}
          searchPlaceholder="Search trips by driver, ID, vehicle, hospital, pickup..."
          defaultSortField="id"
        />
      </div>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Trip Log Details: ${selectedTrip.id}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-0.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Linked Driver</span>
                <span className="text-xs font-semibold text-slate-805 dark:text-slate-100">{selectedTrip.driverName}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-0.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Ambulance Unit</span>
                <span className="text-xs font-semibold text-slate-805 dark:text-slate-100">{selectedTrip.ambulanceId}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Pickup Location</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{selectedTrip.pickupLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Destination Hospital</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{selectedTrip.destinationHospital}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-850 my-1"></div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center gap-1 text-center">
                <Compass className="w-4 h-4 text-primary" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Distance</span>
                <span className="text-xs font-bold text-slate-805 dark:text-slate-150">{selectedTrip.distanceTravelled}</span>
              </div>

              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center gap-1 text-center">
                <Fuel className="w-4 h-4 text-amber-500" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Fuel Consumed</span>
                <span className="text-xs font-bold text-slate-805 dark:text-slate-150">{selectedTrip.fuelUsage}</span>
              </div>

              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center gap-1 text-center">
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Preemption Saved</span>
                <span className="text-xs font-bold text-secondary dark:text-secondary-light">{selectedTrip.timeSaved}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-150 dark:border-slate-850 pt-3 text-slate-500">
              <div className="flex justify-between">
                <span>Start Time:</span>
                <span className="font-semibold text-slate-705 dark:text-slate-350">{selectedTrip.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Arrival Handover:</span>
                <span className="font-semibold text-slate-705 dark:text-slate-350">{selectedTrip.arrivalTime}</span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-4">
              <Button
                variant="secondary"
                className="flex-1 font-semibold"
                onClick={() => { setViewModalOpen(false); setPlaybackModalOpen(true); }}
              >
                Replay Path Trajectory
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewModalOpen(false)}
                className="w-24 font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* GPS Route Playback Modal */}
      {selectedTrip && (
        <Modal
          isOpen={playbackModalOpen}
          onClose={() => setPlaybackModalOpen(false)}
          title={`GPS Route Playback: ${selectedTrip.id}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            
            {/* Visual Vector Route Map Display */}
            <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              
              {/* Map grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
                {Array.from({ length: 72 }).map((_, idx) => (
                  <div key={idx} className="border-t border-l border-white"></div>
                ))}
              </div>

              {/* Glowing Route line */}
              <svg className="absolute inset-0 w-full h-full p-6">
                <polyline
                  points="50,50 150,110 250,90 350,180"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8,5"
                  className="opacity-40"
                />
                
                {/* Visual Route points */}
                <circle cx="50" cy="50" r="6" fill="#DC2626" className="shadow-glow-danger" />
                <circle cx="350" cy="180" r="6" fill="#16A34A" className="shadow-glow-secondary" />
                
                {/* Animated Vehicle Indicator */}
                {selectedTrip.route && (
                  <circle
                    cx={50 + animatingIndex * 100}
                    cy={50 + animatingIndex * 40}
                    r="8"
                    fill="#3B82F6"
                    className="animate-pulse shadow-glow-primary"
                  />
                )}
              </svg>

              {/* Map UI overlays */}
              <div className="absolute bottom-3 left-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-[9px] text-slate-400 font-bold flex flex-col">
                <span>AMBULANCE TELEMETRY BEACON</span>
                <span className="text-xs text-white font-mono">{selectedTrip.ambulanceId} - ON ROUTE</span>
              </div>

              <div className="absolute top-3 right-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-[9px] text-slate-400 font-bold">
                <span>TIME CLEARANCE SAVED: <span className="text-secondary">{selectedTrip.timeSaved}</span></span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Simulation Node</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                  Node {animatingIndex + 1} of {selectedTrip.route ? selectedTrip.route.length : 4} coordinates
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setAnimatingIndex(0)}
                >
                  Restart
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setPlaybackModalOpen(false)}
                  className="font-semibold text-xs"
                >
                  Stop Playback
                </Button>
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default TripMonitoring;
