import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../components/common/Input';
import { ROLE_FIELDS } from '../../data/registrationRoles';

// Simple password strength meter
const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-danger', 'bg-warning', 'bg-blue-400', 'bg-secondary'];
  const textColors = ['', 'text-danger', 'text-warning', 'text-blue-500', 'text-secondary'];

  return (
    <div className="mt-1 px-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={`text-xs font-semibold ${textColors[score]}`}>
          Password strength: {labels[score]}
        </p>
      )}
    </div>
  );
};

const BasicInfoStep = ({ role, formData, onChange, errors }) => {
  const fields = ROLE_FIELDS[role]?.basicInfo || [];
  const [passwordVal, setPasswordVal] = useState(formData.password || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') setPasswordVal(value);
    onChange(name, value);
  };

  return (
    <motion.div
      key="basic-step"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Basic Information
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Fill in the details below. All fields marked with{' '}
          <span className="text-danger font-bold">*</span> are required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        {fields.map((field) => (
          <div key={field.name} className={field.colSpan === 2 ? 'sm:col-span-2' : ''}>
            <Input
              type={field.type}
              name={field.name}
              label={field.label}
              value={formData[field.name] || ''}
              onChange={handleChange}
              options={field.options}
              required={field.required}
              error={errors?.[field.name]}
              placeholder={field.type === 'select' ? `Select ${field.label}` : undefined}
            />
            {field.name === 'password' && (
              <PasswordStrength password={passwordVal} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;
