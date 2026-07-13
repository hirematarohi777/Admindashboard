import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import Input from '../../components/common/Input';
import { Plus, Eye, Check, X, Award, FileText, Smartphone, Truck } from 'lucide-react';

const Drivers = () => {
  const { user } = useAuth();
  const canUpdate = user?.role === 'admin';

  const {
    drivers,
    ambulances,
    updateDriverStatus,
    assignAmbulanceToDriver,
    addDriver,
  } = useData();

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Driver Form State
  const [newDrv, setNewDrv] = useState({
    name: '',
    licenseNumber: '',
    experience: '3 Years',
    phone: '',
    status: 'Pending',
  });

  const columns = [
    { header: 'Driver ID', accessor: 'id', sortable: true },
    { header: 'Driver Name', accessor: 'name', sortable: true },
    { header: 'License Number', accessor: 'licenseNumber' },
    { header: 'Vehicle Linked', accessor: 'assignedAmbulance', sortable: true, filterable: true },
    {
      header: 'Status',
      accessor: 'status',
      filterable: true,
      render: (val) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
            val === 'Active'
              ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
              : val === 'Pending'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-955/30 dark:text-warning-light'
                : 'bg-red-100 text-red-700 dark:bg-red-955/20 dark:text-danger-light'
          }`}
        >
          {val}
        </span>
      ),
    },
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!canUpdate) return;
    if (!newDrv.name || !newDrv.licenseNumber || !newDrv.phone) {
      alert('Name, License Number, and Phone are required.');
      return;
    }
    addDriver(newDrv);
    setAddModalOpen(false);
    setNewDrv({ name: '', licenseNumber: '', experience: '3 Years', phone: '', status: 'Pending' });
  };

  const handleAssignAmbulanceSubmit = (e) => {
    e.preventDefault();
    if (!canUpdate) return;
    if (!selectedDriver) return;
    assignAmbulanceToDriver(selectedDriver.id, selectedDriver.assignedAmbulance);
    setAssignModalOpen(false);
  };

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="outline"
          size="xs"
          icon={Eye}
          onClick={() => {
            setSelectedDriver(row);
            setViewModalOpen(true);
          }}
        >
          Details
        </Button>

        {canUpdate && (
          <>
            <Button
              variant="secondary"
              size="xs"
              icon={Truck}
              onClick={() => {
                setSelectedDriver(row);
                setAssignModalOpen(true);
              }}
            >
              Link
            </Button>

            {row.status === 'Pending' && (
              <>
                <Button
                  variant="success"
                  size="xs"
                  icon={Check}
                  onClick={() => updateDriverStatus(row.id, 'Active')}
                />
                <Button
                  variant="danger"
                  size="xs"
                  icon={X}
                  onClick={() => updateDriverStatus(row.id, 'Rejected')}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Emergency Driver Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Verify operator licenses, check vehicle linkages, and inspect background checks.
          </p>
        </div>

        {canUpdate ? (
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setAddModalOpen(true)}
            className="font-semibold text-xs uppercase"
          >
            Add Driver
          </Button>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">View only</span>
        )}
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={drivers}
          actions={renderActions}
          searchPlaceholder="Search drivers by name, ID, license number..."
          defaultSortField="id"
        />
      </div>

      {/* Driver Profile Detail Modal */}
      {selectedDriver && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Driver Operator: ${selectedDriver.name}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            <div className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                DR
              </div>
              <div className="flex flex-col">
                <h3 className="font-extrabold text-slate-850 dark:text-slate-100">{selectedDriver.name}</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {selectedDriver.id} | {selectedDriver.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-105 dark:bg-blue-950/40 text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Commercial License Number</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {selectedDriver.licenseNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Emergency Experience</span>
                  <span className="text-sm font-medium text-slate-705 dark:text-slate-200">
                    {selectedDriver.experience}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Ambulance</span>
                  <span className="text-sm font-semibold text-slate-805 dark:text-slate-100">
                    {selectedDriver.assignedAmbulance || 'Unassigned'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-950/40 text-secondary">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Contact Phone</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedDriver.phone || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {canUpdate && selectedDriver.status === 'Pending' && (
                <>
                  <Button
                    variant="success"
                    className="flex-1 font-semibold"
                    onClick={() => {
                      updateDriverStatus(selectedDriver.id, 'Active');
                      setViewModalOpen(false);
                    }}
                  >
                    Verify & Approve License
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1 font-semibold"
                    onClick={() => {
                      updateDriverStatus(selectedDriver.id, 'Rejected');
                      setViewModalOpen(false);
                    }}
                  >
                    Reject Driver
                  </Button>
                </>
              )}

              {canUpdate && selectedDriver.status === 'Active' && (
                <Button
                  variant="secondary"
                  className="flex-1 font-semibold"
                  onClick={() => {
                    setViewModalOpen(false);
                    setAssignModalOpen(true);
                  }}
                >
                  Change Vehicle Linkage
                </Button>
              )}

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

      {/* Link Vehicle Modal */}
      {canUpdate && selectedDriver && (
        <Modal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title={`Link Vehicle: ${selectedDriver.name}`}
          size="sm"
        >
          <form onSubmit={handleAssignAmbulanceSubmit} className="flex flex-col gap-4">
            <Input
              label="Select Available Ambulance"
              type="select"
              required
              value={selectedDriver.assignedAmbulance}
              onChange={(e) => setSelectedDriver({ ...selectedDriver, assignedAmbulance: e.target.value })}
              options={[
                { value: 'None', label: 'No Assigned Ambulance' },
                ...ambulances
                  .filter((a) => a.currentStatus === 'Available' || a.currentStatus === 'Active')
                  .map((a) => ({
                    value: a.id,
                    label: `${a.id} (${a.vehicleNumber}) - Hospital: ${a.hospital}`,
                  })),
              ]}
              placeholder="Select an ambulance..."
            />

            <div className="flex gap-2 w-full mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 font-semibold">
                Confirm Link
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Driver Modal */}
      {canUpdate && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Submit New Driver Registration"
          size="md"
        >
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
            <Input
              label="Driver Full Name"
              type="text"
              required
              placeholder="e.g. John Doe"
              value={newDrv.name}
              onChange={(e) => setNewDrv({ ...newDrv, name: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Commercial DL Number"
                type="text"
                required
                placeholder="DL-XXXXXXXX"
                value={newDrv.licenseNumber}
                onChange={(e) => setNewDrv({ ...newDrv, licenseNumber: e.target.value })}
              />
              <Input
                label="Contact Phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={newDrv.phone}
                onChange={(e) => setNewDrv({ ...newDrv, phone: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Driving Experience"
                type="select"
                required
                value={newDrv.experience}
                onChange={(e) => setNewDrv({ ...newDrv, experience: e.target.value })}
                options={[
                  { value: '1 Year', label: '1 Year' },
                  { value: '2 Years', label: '2 Years' },
                  { value: '3 Years', label: '3 Years' },
                  { value: '5 Years', label: '5 Years' },
                  { value: '8 Years', label: '8 Years' },
                  { value: '10+ Years', label: '10+ Years' },
                ]}
              />
              <Input
                label="Initial Status"
                type="select"
                required
                value={newDrv.status}
                onChange={(e) => setNewDrv({ ...newDrv, status: e.target.value })}
                options={[
                  { value: 'Pending', label: 'Pending Verification' },
                  { value: 'Active', label: 'Approved & Active' },
                ]}
              />
            </div>

            <Input
              label="Driver License Document"
              type="file"
              onChange={() => alert('Driver license upload completed in browser cache.')}
            />

            <div className="flex gap-3 w-full mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 font-semibold">
                Submit Application
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Drivers;

