import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import Input from '../../components/common/Input';
import {
  Ambulance,
  Eye,
  Plus,
  Compass,
  Radio,
  Cpu,
  Video,
  Volume2,
  Bell,
  Plug,
  Battery,
  Signal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Ambulances = () => {
  const { user } = useAuth();
  const canUpdate = user?.role === 'admin';

  const { ambulances, hospitals, addAmbulance } = useData();
  const [selectedAmb, setSelectedAmb] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);


  // New Ambulance state
  const [newAmb, setNewAmb] = useState({
    vehicleNumber: "",
    hospital: ""
  });

  const columns = [
    { header: "Ambulance ID", accessor: "id", sortable: true },
    { header: "Vehicle Number", accessor: "vehicleNumber", sortable: true },
    { header: "Hospital Attached", accessor: "hospital", sortable: true, filterable: true },
    { header: "Assigned Driver", accessor: "driver", sortable: true },
    {
      header: "GPS Link",
      accessor: "gpsStatus",
      filterable: true,
      render: (val) => (
        <span className={`flex items-center gap-1.5 text-xs font-semibold ${
          val === 'Online' ? 'text-secondary dark:text-secondary-light' : 'text-danger'
        }`}>
          <Compass className="w-3.5 h-3.5" /> {val}
        </span>
      )
    },
    {
      header: "LoRa Link",
      accessor: "loraStatus",
      filterable: true,
      render: (val) => (
        <span className={`flex items-center gap-1.5 text-xs font-semibold ${
          val === 'Online' ? 'text-secondary dark:text-secondary-light' : 'text-danger'
        }`}>
          <Radio className="w-3.5 h-3.5" /> {val}
        </span>
      )
    },
    {
      header: "Fleet Status",
      accessor: "currentStatus",
      filterable: true,
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
          val === 'Available'
            ? 'bg-green-105 text-green-700 dark:bg-green-950/40 dark:text-green-400'
            : val === 'Active'
            ? 'bg-red-105 text-red-700 dark:bg-red-950/40 dark:text-red-400 animate-pulse-red'
            : val === 'Maintenance'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-955/20 dark:text-warning-light'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {val}
        </span>
      )
    }
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAmb.vehicleNumber || !newAmb.hospital) {
      alert("Vehicle Number and Hospital are required.");
      return;
    }
    addAmbulance(newAmb);
    setAddModalOpen(false);
    setNewAmb({ vehicleNumber: "", hospital: "" });
  };

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="outline"
          size="xs"
          icon={Eye}
          onClick={() => { setSelectedAmb(row); setViewModalOpen(true); }}
        >
          IoT Telemetry
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Ambulance Fleet & Hardware Beacons
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Monitor GPS transponders, LoRa WAN nodes, siren relays, and ESP32 processor statuses.
          </p>
        </div>

        {canUpdate ? (
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setAddModalOpen(true)}
            className="font-semibold text-xs uppercase"
          >
            Add Ambulance
          </Button>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">View only</span>
        )}
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={ambulances}
          actions={renderActions}
          searchPlaceholder="Search vehicles by ID, vehicle number, hospital..."
          defaultSortField="id"
        />
      </div>

      {/* IoT Component Telemetry Modal */}
      {selectedAmb && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`IoT Component Status: ${selectedAmb.id} (${selectedAmb.vehicleNumber})`}
          size="md"
        >
          <div className="flex flex-col gap-5 select-none">
            {/* Status overview */}
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
              <div className="flex items-center gap-3">
                <Ambulance className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Linked Facility</span>
                  <span className="text-sm font-semibold text-slate-805 dark:text-slate-100">{selectedAmb.hospital}</span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Telemetry Ping</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                  selectedAmb.gpsStatus === 'Online' ? 'text-secondary' : 'text-danger'
                }`}>
                  {selectedAmb.gpsStatus === 'Online' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {selectedAmb.gpsStatus === 'Online' ? 'HEALTHY' : 'LINK DROPPED'}
                </span>
              </div>
            </div>

            {/* IoT Hardware Grid */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                Embedded Sensors & Actuators
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                {/* GPS */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">GPS Link</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.gps === 'Healthy' ? 'text-secondary' : 'text-danger'}`}>
                    {selectedAmb.deviceHealth.gps}
                  </span>
                </div>

                {/* LoRa */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">LoRa Node</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.lora === 'Healthy' ? 'text-secondary' : 'text-danger'}`}>
                    {selectedAmb.deviceHealth.lora}
                  </span>
                </div>

                {/* ESP32 */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ESP32 Core</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.esp32 === 'Healthy' ? 'text-secondary' : 'text-danger'}`}>
                    {selectedAmb.deviceHealth.esp32}
                  </span>
                </div>

                {/* Camera */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">CCTV Feed</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.camera === 'Healthy' ? 'text-secondary' : 'text-danger'}`}>
                    {selectedAmb.deviceHealth.camera}
                  </span>
                </div>

                {/* Buzzer */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Buzzer Link</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.buzzer === 'Active' ? 'text-primary' : 'text-slate-400'}`}>
                    {selectedAmb.deviceHealth.buzzer}
                  </span>
                </div>

                {/* Siren */}
                <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Siren Relay</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAmb.deviceHealth.siren === 'Active' ? 'text-danger font-black' : 'text-slate-400'}`}>
                    {selectedAmb.deviceHealth.siren}
                  </span>
                </div>

              </div>
            </div>

            {/* Power Details */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Power Supply */}
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-1 text-center">
                <Plug className="w-4 h-4 text-slate-400 mx-auto" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Power Source</span>
                <span className="text-xs font-bold text-slate-705 dark:text-slate-200">{selectedAmb.deviceHealth.power}</span>
              </div>

              {/* Battery Level */}
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-1 text-center">
                <Battery className="w-4 h-4 text-slate-400 mx-auto" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Charge Remaining</span>
                <span className={`text-xs font-black ${selectedAmb.deviceHealth.battery < 20 ? 'text-danger' : 'text-slate-805 dark:text-slate-200'}`}>
                  {selectedAmb.deviceHealth.battery}%
                </span>
              </div>

              {/* Signal dBm */}
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-1 text-center">
                <Signal className="w-4 h-4 text-slate-400 mx-auto" />
                <span className="text-[9px] text-slate-400 font-bold uppercase">Signal dBm</span>
                <span className="text-xs font-mono font-bold text-slate-705 dark:text-slate-200">
                  {selectedAmb.deviceHealth.signalStrength} dBm
                </span>
              </div>

            </div>

            <div className="flex gap-2.5 mt-2">
              <Button
                variant="outline"
                className="w-full font-semibold"
                onClick={() => setViewModalOpen(false)}
              >
                Dismiss Diagnostics
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Ambulance Modal */}
      {canUpdate && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Enroll New Ambulance Unit"
          size="sm"
        >
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <Input
            label="Vehicle Plate Number"
            type="text"
            required
            placeholder="e.g. TX-EM-9922"
            value={newAmb.vehicleNumber}
            onChange={(e) => setNewAmb({ ...newAmb, vehicleNumber: e.target.value })}
          />

          <Input
            label="Hospital Assignment"
            type="select"
            required
            value={newAmb.hospital}
            onChange={(e) => setNewAmb({ ...newAmb, hospital: e.target.value })}
            options={hospitals.filter(h => h.status === 'Active').map(h => ({
              value: h.name,
              label: h.name
            }))}
            placeholder="Select hospital..."
          />

          <div className="flex gap-2 w-full mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="flex-1 font-semibold"
            >
              Enroll Vehicle
            </Button>
          </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Ambulances;
