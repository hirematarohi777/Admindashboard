import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ConfirmationDialog from '../../components/modals/ConfirmationDialog';
import { Settings as SettingsIcon, Save, RefreshCw, Database, Shield, Server } from 'lucide-react';

const Settings = () => {
  const { systemConfig, setSystemConfig, addAuditLog } = useData();
  const { addToast } = useNotifications();

  // Local Form state
  const [config, setConfig] = useState({ ...systemConfig });
  const [isSaving, setIsSaving] = useState(false);
  const [isBackupLoading, setIsBackupLoading] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [isRestoreLoading, setIsRestoreLoading] = useState(false);

  // Roles Matrix State
  const [roles, setRoles] = useState([
    { role: "System Admin", moduleHospitals: true, moduleDrivers: true, moduleConfig: true, moduleMap: true },
    { role: "TMC Operator", moduleHospitals: false, moduleDrivers: false, moduleConfig: false, moduleMap: true },
    { role: "Medical Supervisor", moduleHospitals: true, moduleDrivers: false, moduleConfig: false, moduleMap: false }
  ]);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setSystemConfig(config);
      setIsSaving(false);
      addAuditLog("Modify Configurations", "Settings", "SYS-CONF", "Saved EOC platform parameters");
      addToast("Configurations Saved", "EOC core threshold and network configurations updated.", "success");
    }, 1500);
  };

  const handleBackup = () => {
    setIsBackupLoading(true);
    addToast("Backup Job Triggered", "Exporting database state and audit history log files...", "info");
    setTimeout(() => {
      setIsBackupLoading(false);
      addAuditLog("Database Backup", "Settings", "SYS-BACKUP", "Created database registry snapshot");
      addToast("System Backup Ready", "Smart City DB snapshot bundle saved as snapshot-2026-07-13.json", "success");
    }, 2500);
  };

  const handleRestore = () => {
    setIsRestoreLoading(true);
    setTimeout(() => {
      setIsRestoreLoading(false);
      setIsRestoreOpen(false);
      addAuditLog("Database Restore", "Settings", "SYS-RESTORE", "Restored database from snapshot-252.json");
      addToast("Database Restored", "All entities, logs, and drivers profiles synced successfully.", "success");
    }, 2000);
  };

  const handleRoleToggle = (index, field) => {
    const updated = [...roles];
    updated[index][field] = !updated[index][field];
    setRoles(updated);
    addToast("Permissions Altered", `Modified role: ${updated[index].role} permissions.`, "warning");
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fade-in">
      
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-805 dark:text-slate-105 tracking-wide uppercase">
          EOC System Configurations
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Tune buzzer decibel thresholds, allocate operator privileges, and schedule database backup jobs.
        </p>
      </div>

      {/* Grid Layout: Configuration forms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: General System Tweaks */}
        <div className="lg:col-span-2 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-1.5 uppercase">
            <SettingsIcon className="w-4 h-4 text-primary" /> Threshold Settings
          </h3>
          
          <form onSubmit={handleSaveConfig} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Sensor Timeout (Seconds)"
                type="number"
                value={config.deviceTimeoutSeconds}
                onChange={(e) => setConfig({ ...config, deviceTimeoutSeconds: parseInt(e.target.value) || 15 })}
              />

              <Input
                label="Alert Propagation Level"
                type="select"
                value={config.alertThreshold}
                onChange={(e) => setConfig({ ...config, alertThreshold: e.target.value })}
                options={[
                  { value: "All Events", label: "All Telemetry Events" },
                  { value: "High Priority Only", label: "Level RED / Emergency Dropouts Only" },
                  { value: "None", label: "Mute System Notifications" }
                ]}
              />
            </div>

            <Input
              label="Whitelisted Security IP Subnets"
              type="text"
              placeholder="e.g. 192.168.1.*"
              value={config.allowedIpList}
              onChange={(e) => setConfig({ ...config, allowedIpList: e.target.value })}
            />

            <div className="flex flex-col gap-3.5 mt-2 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <Input
                label="Activate Fleet Siren Buzzer Controllers"
                type="toggle"
                value={config.buzzerControllers}
                onChange={(e) => setConfig({ ...config, buzzerControllers: e.target.checked })}
              />

              <Input
                label="Enable Auditory Control Room Warnings"
                type="toggle"
                value={config.soundAlerts}
                onChange={(e) => setConfig({ ...config, soundAlerts: e.target.checked })}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={Save}
              className="mt-2 font-semibold text-xs uppercase"
              isLoading={isSaving}
            >
              Save Configuration Settings
            </Button>

          </form>
        </div>

        {/* Right Side: Database Backups & Systems Info */}
        <div className="flex flex-col gap-6">
          
          {/* Backup Panel */}
          <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 uppercase">
              <Database className="w-4 h-4 text-primary" /> EOC Database Registry
            </h3>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full font-semibold text-xs uppercase"
                icon={RefreshCw}
                onClick={handleBackup}
                isLoading={isBackupLoading}
              >
                Trigger Snapshot Backup
              </Button>
              
              <Button
                variant="secondary"
                className="w-full font-semibold text-xs uppercase"
                icon={Database}
                onClick={() => setIsRestoreOpen(true)}
              >
                Restore Snapshot File
              </Button>
            </div>
          </div>

          {/* System Spec Information */}
          <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4.5">
            <h3 className="text-sm font-bold text-slate-850 dark:text-slate-105 flex items-center gap-1.5 uppercase">
              <Server className="w-4 h-4 text-primary" /> Server Statistics
            </h3>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Software Version:</span>
                <span className="font-semibold text-slate-805 dark:text-slate-100">v4.8.12-LTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Storage Load:</span>
                <span className="font-semibold text-slate-805 dark:text-slate-100">44.8 MB / 512 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">LoRa Gateway status:</span>
                <span className="font-semibold text-secondary">ACTIVE (12 Channels)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Core CPU Temp:</span>
                <span className="font-semibold text-slate-805 dark:text-slate-100">42°C (Standard Load)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Role and Permissions Panel */}
      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-105 flex items-center gap-1.5 uppercase">
          <Shield className="w-4 h-4 text-primary" /> Security & Role Privileges Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400 font-bold uppercase">
                <th className="py-3 px-4">Administrative Role</th>
                <th className="py-3 px-4 text-center">Manage Hospitals</th>
                <th className="py-3 px-4 text-center">Verify Drivers</th>
                <th className="py-3 px-4 text-center">Tweak Configurations</th>
                <th className="py-3 px-4 text-center">Override Signal Grid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
              {roles.map((r, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                  <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">{r.role}</td>
                  
                  {/* Manage hospitals */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.moduleHospitals}
                      onChange={() => handleRoleToggle(rIdx, 'moduleHospitals')}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                  </td>

                  {/* Verify drivers */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.moduleDrivers}
                      onChange={() => handleRoleToggle(rIdx, 'moduleDrivers')}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                  </td>

                  {/* Modify Configurations */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.moduleConfig}
                      onChange={() => handleRoleToggle(rIdx, 'moduleConfig')}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                  </td>

                  {/* Override Signal Grid */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.moduleMap}
                      onChange={() => handleRoleToggle(rIdx, 'moduleMap')}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Database Dialogue */}
      <ConfirmationDialog
        isOpen={isRestoreOpen}
        onClose={() => setIsRestoreOpen(false)}
        onConfirm={handleRestore}
        title="Restore EOC Database Registry?"
        message="This operation will overwrite all active drivers, hospitals, and dispatch logs with the selected system snapshot backup."
        type="warning"
        confirmText="Yes, Restore Now"
        cancelText="Cancel"
        isLoading={isRestoreLoading}
      />

    </div>
  );
};

export default Settings;
