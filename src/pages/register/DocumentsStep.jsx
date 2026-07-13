import React from 'react';
import { motion } from 'framer-motion';
import { ROLE_FIELDS } from '../../data/registrationRoles';
import FileUploadField from '../../components/register/FileUploadField';

const DocumentsStep = ({ role, formData, onChange, errors }) => {
  const docFields = ROLE_FIELDS[role]?.documents || [];

  return (
    <motion.div
      key="docs-step"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Upload Documents
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload the required documents for verification. Accepted: PDF, JPG, PNG (max 10 MB each).
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {docFields.map((doc) => (
          <div key={doc.name}>
            <FileUploadField
              name={doc.name}
              label={doc.label}
              hint={doc.hint}
              required={doc.required}
              accept={doc.accept}
              value={formData[doc.name] || null}
              onChange={(e) => onChange(doc.name, e.target.value)}
            />
            {errors?.[doc.name] && (
              <p className="text-xs text-danger font-semibold mt-1 pl-1 animate-pulse">
                {errors[doc.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Security note */}
      <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
          🔒 <strong>Secure Upload:</strong> All documents are encrypted and only accessible to
          authorized System Administrators during the review process.
        </p>
      </div>
    </motion.div>
  );
};

export default DocumentsStep;
