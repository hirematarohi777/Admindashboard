import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step bubble + label */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? '#16A34A'
                    : isActive
                    ? '#2563EB'
                    : undefined,
                  borderColor: isCompleted
                    ? '#16A34A'
                    : isActive
                    ? '#2563EB'
                    : undefined,
                }}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${isCompleted
                    ? 'bg-secondary border-secondary text-white shadow-glow-secondary'
                    : isActive
                    ? 'bg-primary border-primary text-white shadow-glow-primary'
                    : 'bg-white dark:bg-govdark-card border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500'
                  }
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              {/* Step label — hidden on very small screens */}
              <span
                className={`hidden sm:block text-xs font-semibold text-center whitespace-nowrap transition-colors duration-300 ${
                  isCompleted
                    ? 'text-secondary'
                    : isActive
                    ? 'text-primary'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 mx-2 sm:mx-3 mb-5 sm:mb-6 h-0.5 relative overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={false}
                  animate={{ width: currentStep > index ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute left-0 top-0 h-full bg-secondary rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
