import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';

const RoleSelectCard = ({ role, isSelected, onSelect }) => {
  const { label, icon: Icon, description, approvalTime, gradient, border, iconBg } = role;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(role.id)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer
        bg-gradient-to-br ${gradient}
        ${isSelected
          ? `${border} shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-govdark-card ring-current`
          : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
        }
      `}
      style={isSelected ? { '--tw-ring-color': 'rgba(37,99,235,0.5)' } : {}}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-3 right-3 text-primary"
        >
          <CheckCircle2 className="w-5 h-5" />
        </motion.div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Label */}
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">
        {label}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {description}
      </p>

      {/* Approval time badge */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{approvalTime}</span>
      </div>
    </motion.button>
  );
};

export default RoleSelectCard;
