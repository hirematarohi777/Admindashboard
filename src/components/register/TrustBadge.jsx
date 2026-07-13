import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-400/20',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-400/20',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-400/20',
};

const TrustBadge = ({ icon: Icon, label, color = 'blue', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-sm ${colorMap[color]}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{label}</span>
    </motion.div>
  );
};

export default TrustBadge;
