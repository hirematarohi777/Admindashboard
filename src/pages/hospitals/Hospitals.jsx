import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import ReusableTable from '../../components/tables/ReusableTable';
import Button from '../../components/common/Button';
import Modal from '../../components/modals/Modal';
import { Eye, Phone, MapPin, User, FileText } from 'lucide-react';


const Hospitals = () => {
  const { hospitals } = useData();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const columns = [
    { header: "Hospital ID", accessor: "id", sortable: true },
    { header: "Hospital Name", accessor: "name", sortable: true },
    { header: "City", accessor: "city", sortable: true, filterable: true },
    { header: "Contact", accessor: "contact" },
    { header: "Reg Date", accessor: "registrationDate", sortable: true },
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
    },
    {
      header: "Verification",
      accessor: "verificationStatus",
      filterable: true,
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
          val === 'Approved'
            ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
            : val === 'Pending'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-955/30 dark:text-warning-light'
            : val === 'Suspended'
            ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
            : 'bg-red-100 text-red-700 dark:bg-red-955/20 dark:text-danger-light'
        }`}>
          {val}
        </span>
      )
    }
  ];

  const handleAddSubmit = () => {
    e.preventDefault();
    if (!newHosp.name || !newHosp.city || !newHosp.contact) {
      alert("Please fill out name, city, and contact details.");
      return;
    }
    addHospital(newHosp);
    setAddModalOpen(false);
    setNewHosp({
      name: "",
      city: "",
      contact: "",
      contactPerson: "",
      license: "",
      address: "",
      lat: 37.7749,
      lng: -122.4194,
      bedsAvailable: 10,
      icuBedsAvailable: 2,
      verificationStatus: "Approved"
    });
  };

  const handleAction = (hospital) => {
    setSelectedHospital(hospital);
    setViewModalOpen(true);
  };

  const renderActions = (row) => {
    return (
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="outline"
          size="xs"
          icon={Eye}
          onClick={() => handleAction(row)}
        >
          View
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Hospital Directory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Manage hospital registration verification, license logs, and capacities.
          </p>
        </div>


      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <ReusableTable
          columns={columns}
          data={hospitals}
          actions={renderActions}
          searchPlaceholder="Search hospitals by name, city, ID..."
          defaultSortField="id"
        />
      </div>

      {/* View Details Modal */}
      {selectedHospital && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={`Hospital Profile: ${selectedHospital.name}`}
          size="md"
        >
          <div className="flex flex-col gap-4 select-none">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Hospital ID</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{selectedHospital.id}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Registration Date</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{selectedHospital.registrationDate}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-primary dark:text-primary-light">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Contact Person</span>
                  <span className="text-sm font-medium text-slate-705 dark:text-slate-200">{selectedHospital.contactPerson}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-950/40 text-secondary dark:text-secondary-light">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</span>
                  <span className="text-sm font-medium text-slate-705 dark:text-slate-200">{selectedHospital.contact}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/40 text-danger dark:text-danger-light">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Location Coordinates</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">{selectedHospital.address}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">LAT: {selectedHospital.lat} | LNG: {selectedHospital.lng}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-yellow-100 dark:bg-yellow-950/40 text-warning">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Operating License ID</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{selectedHospital.license}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">STANDARD BEDS</span>
                <span className="text-lg font-black text-slate-800 dark:text-slate-100">{selectedHospital.bedsAvailable}</span>
              </div>
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">ICU BEDS</span>
                <span className="text-lg font-black text-primary">{selectedHospital.icuBedsAvailable}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
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



    </div>
  );
};

export default Hospitals;
