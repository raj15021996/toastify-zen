import React from 'react';
import { useToaster, ToastPosition } from '@/contexts/ToasterContext';
import { ToastItem } from './ToastItem';

const getPositionClasses = (position: ToastPosition): string => {
  const baseClasses = 'fixed z-50 flex flex-col gap-2 p-4 pointer-events-none';
  
  switch (position) {
    case 'top-left':
      return `${baseClasses} top-0 left-0`;
    case 'top-right':
      return `${baseClasses} top-0 right-0`;
    case 'top-center':
      return `${baseClasses} top-0 left-1/2 -translate-x-1/2`;
    case 'bottom-left':
      return `${baseClasses} bottom-0 left-0`;
    case 'bottom-right':
      return `${baseClasses} bottom-0 right-0`;
    case 'bottom-center':
      return `${baseClasses} bottom-0 left-1/2 -translate-x-1/2`;
    default:
      return `${baseClasses} top-0 right-0`;
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
