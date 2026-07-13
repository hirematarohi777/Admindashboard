import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Image, X, CheckCircle2 } from 'lucide-react';

const FileUploadField = ({ name, label, hint, required = false, accept = 'image/*,application/pdf', value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState(value || null); // { name, preview, type, size }
  const inputRef = useRef(null);

  const processFile = useCallback(
    (file) => {
      if (!file) return;

      const maxBytes = 10 * 1024 * 1024; // 10MB
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const isAllowed = isImage || isPdf;

      if (!isAllowed) {
        setFileInfo(null);
        if (onChange) onChange({ target: { name, value: null } });
        return;
      }


      if (file.size > maxBytes) {
        // Keep UI in a consistent state: clear previously selected file
        setFileInfo(null);
        if (onChange) onChange({ target: { name, value: null } });
        return;
      }

      if (!isImage && !isPdf) {
        setFileInfo(null);
        if (onChange) onChange({ target: { name, value: null } });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const info = {
          name: file.name,
          size: file.size,
          type: file.type,
          preview: isImage ? reader.result : null,
        };
        setFileInfo(info);
        if (onChange) onChange({ target: { name, value: file } });
      };
      reader.readAsDataURL(file);
    },
    [name, onChange]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFileInfo(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onChange) onChange({ target: { name, value: null } });
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        aria-label={label}
      />

      {/* Drop zone */}
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? '#2563EB' : fileInfo ? '#16A34A' : undefined,
          backgroundColor: isDragging ? 'rgba(37,99,235,0.05)' : undefined,
        }}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-colors duration-200 min-h-[130px]
          flex flex-col items-center justify-center gap-3
          ${fileInfo
            ? 'border-secondary/50 bg-secondary/5 dark:bg-secondary/5'
            : isDragging
            ? 'border-primary bg-primary/5'
            : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {fileInfo ? (
            <motion.div
              key="file-preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              {fileInfo.preview ? (
                <img
                  src={fileInfo.preview}
                  alt="Upload preview"
                  className="h-24 max-w-full object-contain rounded-xl shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-slate-500 dark:text-slate-400" />
                </div>
              )}

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[220px]">
                  {fileInfo.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(fileInfo.size)}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>File selected</span>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs text-danger hover:text-red-700 font-semibold mt-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="file-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isDragging ? 'bg-primary/10' : 'bg-slate-100 dark:bg-slate-800'
              }`}>
                <Upload className={`w-6 h-6 transition-colors ${isDragging ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`} />
              </div>
              <div>
                <span className="text-sm font-semibold text-primary block">
                  {isDragging ? 'Drop file here' : 'Click or drag & drop'}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{hint}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FileUploadField;
