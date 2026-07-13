import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, FileText, CheckCircle2, User, Building2, Truck, TrafficCone } from 'lucide-react';
import { ROLES, ROLE_FIELDS } from '../../data/registrationRoles';

const roleIconMap = {
  hospital: Building2,
  medical_officer: User,
  driver: Truck,
  traffic_center: TrafficCone,
};

const SENSITIVE_FIELDS = ['password', 'confirmPassword'];

const ReviewStep = ({ role, basicInfo, documents, onEditStep }) => {
  const roleData = ROLES.find((r) => r.id === role);
  const RoleIcon = roleIconMap[role] || User;
  const fields = ROLE_FIELDS[role]?.basicInfo || [];
  const docFields = ROLE_FIELDS[role]?.documents || [];

  const displayValue = (field, value) => {
    if (!value && value !== 0) return '—';
    if (field.type === 'radio') {
      const opt = field.options?.find((o) => o.value === value);
      return opt?.label || value;
    }
    if (field.type === 'select') {
      const opt = field.options?.find((o) => o.value === value);
      return opt?.label || value;
    }
    return String(value);
  };

  return (
    <motion.div
      key="review-step"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Review & Submit
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review all information carefully before submitting your application.
        </p>
      </div>

      {/* Role Summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <RoleIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Selected Role</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(0)}
            className="flex items-center gap-1 text-xs text-primary hover:text-blue-700 font-semibold transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Change
          </button>
        </div>
        <div className="px-4 py-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${roleData?.iconBg}`}>
            <RoleIcon className="w-4 h-4" />
            {roleData?.label}
          </div>
        </div>
      </div>

      {/* Basic Info Summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Basic Information</span>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="flex items-center gap-1 text-xs text-primary hover:text-blue-700 font-semibold transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {fields
            .filter((f) => !SENSITIVE_FIELDS.includes(f.name))
            .map((field) => (
              <div key={field.name} className="flex justify-between items-start px-4 py-2.5 gap-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 min-w-[130px]">
                  {field.label}
                </span>
                <span className="text-xs text-slate-800 dark:text-slate-200 text-right break-words">
                  {displayValue(field, basicInfo[field.name])}
                </span>
              </div>
            ))}
          <div className="flex justify-between items-center px-4 py-2.5 gap-4">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 min-w-[130px]">
              Password
            </span>
            <span className="text-xs text-slate-800 dark:text-slate-200">
              {basicInfo.password ? '••••••••' : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Documents Summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Uploaded Documents</span>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="flex items-center gap-1 text-xs text-primary hover:text-blue-700 font-semibold transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {docFields.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between px-4 py-2.5 gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {doc.label}
                </span>
              </div>
              {documents[doc.name] ? (
                <div className="flex items-center gap-1 text-xs text-secondary font-semibold flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Uploaded
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic flex-shrink-0">
                  {doc.required ? 'Not uploaded' : 'Optional — skipped'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Declaration */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
        <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
          ⚠️ By submitting this application, you confirm that all information provided is accurate and complete. False information may result in permanent disqualification.
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
