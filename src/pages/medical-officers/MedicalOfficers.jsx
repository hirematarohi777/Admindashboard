import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import Input from '../../components/common/Input';
import { Plus, Eye, Building2, Briefcase, Mail, Phone } from 'lucide-react';

const MedicalOfficers = () => {
  const { user } = useAuth();
  const canUpdate = user?.role === 'admin';

  const { medicalOfficers, hospitals, assignHospitalToMO, addMedicalOfficer } = useData();

  const [selectedMO, setSelectedMO] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Officer State
  const [newMO, setNewMO] = useState({
    name: '',
    hospital: '',
    specialization: 'Emergency Medicine',
    email: '',
    phone: '',
  });

  const columns = [
    { header: 'MO ID', accessor: 'id', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Hospital Assigned', accessor: 'hospital', sortable: true, filterable: true },
    { header: 'Specialization', accessor: 'specialization', sortable: true, filterable: true },
    {
      header: 'Status',
      accessor: 'status',
      filterable: true,
      render: (val) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            val === 'Active'
              ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
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
    if (!newMO.name || !newMO.email) {
      alert('Name and Email are required fields.');
      return;
    }
    addMedicalOfficer(newMO);
    setAddModalOpen(false);
    setNewMO({ name: '', hospital: '', specialization: 'Emergency Medicine', email: '', phone: '' });
  };

  const handleAssignHospitalSubmit = (e) => {
    e.preventDefault();
    if (!canUpdate) return;
    if (!selectedMO) return;
    assignHospitalToMO(selectedMO.id, selectedMO.hospital);
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
            setSelectedMO(row);
            setViewModalOpen(true);
          }}
        >
          Profile
        </Button>

        {canUpdate && (
          <Button
            variant="secondary"
            size="xs"
            icon={Building2}
            onClick={() => {
              setSelectedMO(row);
              setAssignModalOpen(true);
            }}
          >
            Assign
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">Medical Officers</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Manage hospital ER assignments, trauma specializations, and officer contact cards.
          </p>
        </div>

        {canUpdate ? (
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setAddModalOpen(true)}
            className="font-semibold text-xs uppercase"
          >
            Add Officer
          </Button>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">View only</span>
        )}
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={medicalOfficers}
          actions={renderActions}
          searchPlaceholder="Search officers by name, specialization, hospital..."
          defaultSortField="id"
        />
      </div>

      {/* Profile Details Modal */}
      {selectedMO && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Officer Card: Dr. ${selectedMO.name}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            <div className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-650 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                MO
              </div>
              <div className="flex flex-col">
                <h3 className="font-extrabold text-slate-850 dark:text-slate-100">{selectedMO.name}</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {selectedMO.id} | {selectedMO.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-primary">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Affiliated Hospital</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {selectedMO.hospital || 'Not Assigned'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Clinical Specialty</span>
                  <span className="text-sm font-medium text-slate-705 dark:text-slate-200">{selectedMO.specialization}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 text-indigo-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Government Email</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedMO.email || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-950/40 text-secondary">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Primary Hotline</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedMO.phone || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {canUpdate && (
                <Button
                  variant="secondary"
                  className="flex-1 font-semibold"
                  onClick={() => {
                    setViewModalOpen(false);
                    setAssignModalOpen(true);
                  }}
                >
                  Reassign Hospital
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setViewModalOpen(false)}
                className={canUpdate ? 'w-24 font-semibold' : 'flex-1 font-semibold'}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Assign Hospital Modal */}
      {canUpdate && selectedMO && (
        <Modal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title={`Assign Hospital: Dr. ${selectedMO.name}`}
          size="sm"
        >
          <form onSubmit={handleAssignHospitalSubmit} className="flex flex-col gap-4">
            <Input
              label="Select Active Hospital Facility"
              type="select"
              required
              value={selectedMO.hospital}
              onChange={(e) => setSelectedMO({ ...selectedMO, hospital: e.target.value })}
              options={hospitals
                .filter((h) => h.status === 'Active')
                .map((h) => ({ value: h.name, label: h.name }))}
              placeholder="Select a hospital..."
            />

            <div className="flex gap-2 w-full mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 font-semibold">
                Confirm Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Officer Modal */}
      {canUpdate && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Register New Medical Officer"
          size="md"
        >
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
            <Input
              label="Doctor's Full Name"
              type="text"
              required
              placeholder="e.g. Dr. Bruce Banner"
              value={newMO.name}
              onChange={(e) => setNewMO({ ...newMO, name: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Medical Specialization"
                type="select"
                required
                value={newMO.specialization}
                onChange={(e) => setNewMO({ ...newMO, specialization: e.target.value })}
                options={[
                  { value: 'Emergency Medicine', label: 'Emergency Medicine' },
                  { value: 'Trauma Surgery', label: 'Trauma Surgery' },
                  { value: 'Pediatric Emergency', label: 'Pediatric Emergency' },
                  { value: 'Cardiology', label: 'Cardiology' },
                  { value: 'Neurosurgery', label: 'Neurosurgery' },
                ]}
              />
              <Input
                label="Contact Hotline"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={newMO.phone}
                onChange={(e) => setNewMO({ ...newMO, phone: e.target.value })}
              />
            </div>

            <Input
              label="Officer Email Address"
              type="email"
              required
              placeholder="b.banner@metrogeneral.gov"
              value={newMO.email}
              onChange={(e) => setNewMO({ ...newMO, email: e.target.value })}
            />

            <Input
              label="Hospital Assignment (Optional)"
              type="select"
              value={newMO.hospital}
              onChange={(e) => setNewMO({ ...newMO, hospital: e.target.value })}
              options={hospitals
                .filter((h) => h.status === 'Active')
                .map((h) => ({ value: h.name, label: h.name }))}
              placeholder="Leave unassigned..."
            />

            <div className="flex gap-3 w-full mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1 font-semibold">
                Register Officer
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MedicalOfficers;

