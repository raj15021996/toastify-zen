import React from 'react';
import { useToaster, ToastPosition } from '@/contexts/ToasterContext';
import { ToastItem } from './ToastItem';

const getPositionClasses = (position: ToastPosition): string => {
  const baseClasses = 'fixed z-50 flex flex-col gap-2 pointer-events-none';
  const padding = 'p-2 sm:p-4';
  const mobileCenter = 'max-sm:left-0 max-sm:right-0 max-sm:!translate-x-0';
  
  switch (position) {
    case 'top-left':
      return `${baseClasses} ${padding} top-0 left-0 ${mobileCenter}`;
    case 'top-right':
      return `${baseClasses} ${padding} top-0 right-0 ${mobileCenter}`;
    case 'top-center':
      return `${baseClasses} ${padding} top-0 left-1/2 -translate-x-1/2 max-sm:left-0 max-sm:right-0 max-sm:!translate-x-0`;
    case 'bottom-left':
      return `${baseClasses} ${padding} bottom-0 left-0 ${mobileCenter}`;
    case 'bottom-right':
      return `${baseClasses} ${padding} bottom-0 right-0 ${mobileCenter}`;
    case 'bottom-center':
      return `${baseClasses} ${padding} bottom-0 left-1/2 -translate-x-1/2 max-sm:left-0 max-sm:right-0 max-sm:!translate-x-0`;
    default:
      return `${baseClasses} ${padding} top-0 right-0 ${mobileCenter}`;
  }
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToaster();

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, typeof toasts>);

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div key={position} className={getPositionClasses(position as ToastPosition)}>
          {positionToasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      ))}
    </>
  );
};
