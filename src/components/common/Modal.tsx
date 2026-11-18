import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className={`modal-dialog-custom modal-${size} modal-entrance`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-custom">
          <h5>{title}</h5>
          <button
            type="button"
            className="btn btn-sm btn-icon text-muted p-1"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body-custom">{children}</div>
        {footer && <div className="modal-footer-custom">{footer}</div>}
      </div>
    </div>
  );
};

