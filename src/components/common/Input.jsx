import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  options = [], // For select dropdowns
  required = false,
  className = '',
  id,
  name,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // File Change Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(file.name);
      }
      if (onChange) {
        onChange({ target: { name, value: file } });
      }
    }
  };

  // Trigger File Input Click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset File
  const handleFileReset = (e) => {
    e.stopPropagation();
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onChange) {
      onChange({ target: { name, value: null } });
    }
  };

  const isFloating = type === 'text' || type === 'email' || type === 'password' || type === 'number' || type === 'tel' || type === 'date' || type === 'time';

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      
      {/* 1. Toggle Switch */}
      {type === 'toggle' && (
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!value}
            onChange={onChange}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          {label && <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>}
        </label>
      )}

      {/* 2. Checkbox */}
      {type === 'checkbox' && (
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!value}
            onChange={onChange}
            disabled={disabled}
            className="w-4.5 h-4.5 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
            {...props}
          />
          {label && <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>}
        </label>
      )}

      {/* 3. Radio Buttons */}
      {type === 'radio' && (
        <div className="flex flex-col gap-2">
          {label && <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>}
          <div className="flex flex-wrap gap-4">
            {options.map((opt) => (
              <label key={opt.value} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={disabled}
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 focus:ring-primary dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
                  {...props}
                />
                <span className="ms-2 text-sm text-slate-600 dark:text-slate-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 4. Select Dropdown */}
      {type === 'select' && (
        <div className="relative">
          {label && <label htmlFor={inputId} className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">{label}</label>}
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-govdark-card text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
              error ? 'border-danger focus:ring-danger/50' : 'border-slate-300 dark:border-slate-750'
            }`}
            {...props}
          >
            <option value="" disabled>{placeholder || "Select option..."}</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* 5. Custom File Uploader with Preview */}
      {type === 'file' && (
        <div>
          {label && <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">{label}</label>}
          <input
            type="file"
            name={name}
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
            accept="image/*,application/pdf"
            {...props}
          />
          
          <div
            onClick={triggerFileInput}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-colors ${
              filePreview 
                ? 'border-secondary/50 bg-secondary/5 dark:bg-secondary/5' 
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {filePreview ? (
              <div className="flex flex-col items-center gap-2 w-full">
                {filePreview.startsWith('data:image/') ? (
                  <img
                    src={filePreview}
                    alt="Uploaded preview"
                    className="h-28 max-w-full object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-850 rounded-xl text-slate-700 dark:text-slate-200 text-xs font-medium w-full text-center truncate">
                    {filePreview}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleFileReset}
                  className="text-xs text-danger hover:underline mt-1 font-semibold"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-slate-400" />
                <div className="text-center">
                  <span className="text-sm font-semibold text-primary block">Click to upload document</span>
                  <span className="text-xs text-slate-550 block mt-0.5">PDF or Image (Max 5MB)</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 6. Floating Label Inputs (Text, Password, Number, Tel, Date, Time) */}
      {isFloating && (
        <div className="relative">
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            id={inputId}
            name={name}
            placeholder=" " // Required for CSS peer-placeholder-shown
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`peer w-full px-4 pt-6 pb-2 text-sm rounded-xl border bg-white dark:bg-govdark-card text-slate-850 dark:text-slate-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
              error ? 'border-danger focus:ring-danger/50' : 'border-slate-300 dark:border-slate-750'
            }`}
            {...props}
          />
          
          <label
            htmlFor={inputId}
            className={`absolute left-4 top-2 text-xs font-semibold text-slate-500 dark:text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary dark:peer-focus:text-primary-light`}
          >
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3.5 top-4.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
      )}

      {/* Validation Error UI */}
      {error && (
        <span className="text-xs text-danger font-semibold mt-0.5 pl-1 animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
