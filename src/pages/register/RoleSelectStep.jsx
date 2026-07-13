import React from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../../data/registrationRoles';
import RoleSelectCard from '../../components/register/RoleSelectCard';

const RoleSelectStep = ({ selectedRole, onSelect }) => {
  return (
    <motion.div
      key="role-step"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          What is your role?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Select the category that best describes your entity. Each role has a tailored registration form.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <RoleSelectCard
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RoleSelectStep;
