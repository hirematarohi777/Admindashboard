import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import Input from '../../components/common/Input';
import { Plus, Eye, User, Award } from 'lucide-react';

const TrafficCenters = () => {
  const { trafficCenters, assignTMCSupervisor, assignOperatorRole, addTrafficCenter } = useData();
  const [selectedTC, setSelectedTC] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [supModalOpen, setSupModalOpen] = useState(false);
  const [opModalOpen, setOpModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form states
  const [newTC, setNewTC] = useState({ name: "", city: "", supervisor: "" });
  const [newSup, setNewSup] = useState("");
  const [newOp, setNewOp] = useState("");

  const columns = [
    { header: "Center ID", accessor: "id", sortable: true },
    { header: "Center Name", accessor: "name", sortable: true },
    { header: "City Area", accessor: "city", sortable: true, filterable: true },
    { header: "Supervisor Officer", accessor: "supervisor", sortable: true },
    {
      header: "Active Operators",
      accessor: "operators",
      render: (val) => (
        <span className="text-xs font-semibold text-slate-650 dark:text-slate-300">
          {val.length} Operators Shift
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      filterable: true,
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          val === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {val}
        </span>
      )
    }
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTC.name || !newTC.city) {
      alert("Name and City district are required.");
      return;
    }
    addTrafficCenter(newTC);
    setAddModalOpen(false);
    setNewTC({ name: "", city: "", supervisor: "" });
  };

  const handleSupervisorSubmit = (e) => {
    e.preventDefault();
    if (!selectedTC || !newSup) return;
    assignTMCSupervisor(selectedTC.id, newSup);
    setSupModalOpen(false);
    setNewSup("");
  };

  const handleOperatorSubmit = (e) => {
    e.preventDefault();
    if (!selectedTC || !newOp) return;
    assignOperatorRole(selectedTC.id, newOp);
    setOpModalOpen(false);
    setNewOp("");
  };

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="outline"
          size="xs"
          icon={Eye}
          onClick={() => { setSelectedTC(row); setViewModalOpen(true); }}
        >
          View
        </Button>
        <Button
          variant="secondary"
          size="xs"
          icon={Award}
          onClick={() => { setSelectedTC(row); setNewSup(row.supervisor); setSupModalOpen(true); }}
        >
          Supervisor
        </Button>
        <Button
          variant="outline"
          size="xs"
          icon={User}
          onClick={() => { setSelectedTC(row); setOpModalOpen(true); }}
        >
          Operators
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Traffic Management Centers (TMC)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Manage city signal hubs, assign operators on duty, and link automated preemption channels.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setAddModalOpen(true)}
          className="font-semibold text-xs uppercase"
        >
          Add TMC Center
        </Button>
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={trafficCenters}
          actions={renderActions}
          searchPlaceholder="Search traffic hubs, city areas, supervisors..."
          defaultSortField="id"
        />
      </div>

      {/* TMC details Modal */}
      {selectedTC && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Traffic Hub Profile: ${selectedTC.name}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            <div className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                TMC
              </div>
              <div className="flex flex-col">
                <h3 className="font-extrabold text-slate-850 dark:text-slate-100">{selectedTC.name}</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedTC.id} | {selectedTC.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Supervisor On Duty</span>
                <span className="text-xs font-semibold text-slate-705 dark:text-slate-200">{selectedTC.supervisor || "Not Set"}</span>
              </div>
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Grid Jurisdiction</span>
                <span className="text-xs font-semibold text-slate-705 dark:text-slate-200">{selectedTC.city}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                Operators roster ({selectedTC.operators.length})
              </span>
              {selectedTC.operators.length === 0 ? (
                <p className="text-xs text-slate-400 pl-1 italic">No operators logged onto grid console.</p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedTC.operators.map(op => (
                    <span key={op} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-850 text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-750 font-medium">
                      {op}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                className="w-full font-semibold"
                onClick={() => setViewModalOpen(false)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Assign Supervisor Modal */}
      {selectedTC && (
        <Modal
          isOpen={supModalOpen}
          onClose={() => setSupModalOpen(false)}
          title={`Assign Supervisor: ${selectedTC.name}`}
          size="sm"
        >
          <form onSubmit={handleSupervisorSubmit} className="flex flex-col gap-4">
            <Input
              label="Supervisor Full Name"
              type="text"
              required
              placeholder="e.g. Commander Marcus Brody"
              value={newSup}
              onChange={(e) => setNewSup(e.target.value)}
            />

            <div className="flex gap-2 w-full mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSupModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="flex-1 font-semibold"
              >
                Set Supervisor
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Assign Operator Modal */}
      {selectedTC && (
        <Modal
          isOpen={opModalOpen}
          onClose={() => setOpModalOpen(false)}
          title={`Toggle Roster Operator: ${selectedTC.name}`}
          size="sm"
        >
          <form onSubmit={handleOperatorSubmit} className="flex flex-col gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter an operator's name to assign/remove them from this Traffic Control hub.
            </p>
            
            <Input
              label="Operator Name"
              type="text"
              required
              placeholder="e.g. Jack Shephard"
              value={newOp}
              onChange={(e) => setNewOp(e.target.value)}
            />

            <div className="flex gap-2 w-full mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="flex-1 font-semibold"
              >
                Toggle Operator
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add TMC Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Register Traffic Management Control Center"
        size="md"
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <Input
            label="Control Hub Name"
            type="text"
            required
            placeholder="e.g. Western Corridor Control Hub"
            value={newTC.name}
            onChange={(e) => setNewTC({ ...newTC, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="District Jurisdiction"
              type="text"
              required
              placeholder="e.g. Westside Hills"
              value={newTC.city}
              onChange={(e) => setNewTC({ ...newTC, city: e.target.value })}
            />
            <Input
              label="Supervisor (Optional)"
              type="text"
              placeholder="e.g. Supervisor Walter White"
              value={newTC.supervisor}
              onChange={(e) => setNewTC({ ...newTC, supervisor: e.target.value })}
            />
          </div>

          <div className="flex gap-3 w-full mt-4">
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
              Initialize TMC Hub
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default TrafficCenters;
