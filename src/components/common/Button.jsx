import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const sizes = {
    xs: "px-2.5 py-1.5 text-xs rounded-lg gap-1",
    sm: "px-3 py-2 text-sm rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-glow-primary focus:ring-blue-500",
    secondary: "bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 focus:ring-slate-500",
    success: "bg-secondary text-white hover:bg-green-700 dark:hover:bg-green-500 hover:shadow-glow-secondary focus:ring-green-500",
    danger: "bg-danger text-white hover:bg-red-750 dark:hover:bg-red-500 hover:shadow-glow-danger focus:ring-red-500",
    warning: "bg-warning text-white hover:bg-amber-600 focus:ring-amber-500",
    outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500",
    ghost: "text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-850 focus:ring-slate-400",
  };

  const currentStyles = `${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`;

  return (
    <motion.button
      whileHover={(!isDisabled && !isLoading) ? { scale: 1.02 } : {}}
      whileTap={(!isDisabled && !isLoading) ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={currentStyles}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {!isLoading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      
      <span>{isLoading ? 'Processing...' : children}</span>
      
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </motion.button>
  );
};

export default Button;
