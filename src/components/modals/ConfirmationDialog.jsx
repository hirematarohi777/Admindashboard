import React from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const ConfirmationDialog = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  type = "warning", // warning, danger, success, info
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false
}) => {
  const icons = {
    warning: <AlertTriangle className="w-12 h-12 text-warning" />,
    danger: <AlertTriangle className="w-12 h-12 text-danger animate-bounce" />,
    success: <CheckCircle2 className="w-12 h-12 text-secondary" />,
    info: <Info className="w-12 h-12 text-primary" />
  };

  const confirmVariants = {
    warning: "warning",
    danger: "danger",
    success: "success",
    info: "primary"
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        {icons[type]}
        
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-650 dark:text-slate-350">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariants[type]}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
