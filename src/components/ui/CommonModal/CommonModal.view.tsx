"use client";
import { useEffect } from "react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  container_class?:string;
  modalClassName?: string; // for extra styling
}

export default function CommonModal({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  showCloseButton = true,
  modalClassName = "",
  container_class
}: CommonModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={"fixed inset-0  z-50 flex items-center justify-center bg-black/50 "+{container_class}}
    >
      <div
        className={`relative max-w-lg bg-transparent rounded-lg shadow-lg w-auto ${modalClassName}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}