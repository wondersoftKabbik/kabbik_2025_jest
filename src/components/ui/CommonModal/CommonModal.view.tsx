"use client";
import { useEffect } from "react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  container_class?:string;
  replaceClassName?:string;
  modalClassName?: string; // for extra styling
}

export default function CommonModal({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  showCloseButton = true,
  modalClassName = "",
  container_class,
  replaceClassName
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
      className={"fixed inset-0  z-[999] flex items-center justify-center bg-black/50 "+{container_class}}
    >
      <div
        className={replaceClassName??`relative z-[999] max-w-lg bg-transparent rounded-lg shadow-lg w-auto ${modalClassName}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 z-10 right-3 bg-slate-500 rounded-[50%] px-2 py-0.5 text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}