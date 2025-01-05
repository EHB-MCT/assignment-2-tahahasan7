import { X } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

/**
 * Modal component that displays a modal dialog with optional title and content.
 * The modal can be opened or closed based on the `isOpen` prop.
 * Includes a background overlay that closes the modal when clicked.
 *
 * @component
 * @param {boolean} isOpen - Determines if the modal is visible or not.
 * @param {function} onClose - A function to close the modal.
 * @param {string} [title] - The title of the modal, displayed at the top.
 * @param {React.ReactNode} children - The content to display inside the modal.
 * @param {string} [className] - Optional custom className for additional styling of the modal.
 * @returns {JSX.Element | null} The rendered modal if `isOpen` is true, or `null` otherwise.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // If the modal is not open, return null (not rendered)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className={cn("relative", className)}>
            {title && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
