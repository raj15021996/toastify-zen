import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastItem } from '@/components/Toaster/ToastItem';

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastAnimation = 'fade' | 'slide' | 'zoom' | 'bounce' | 'rotate' | 'flip' | 'swing';
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastTheme = 'colored' | 'light';

export interface ToastCustomStyles {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  boxShadow?: string;
  border?: string;
  fontWeight?: string;
  padding?: string;
  fontStyle?: string;
  progressBarColor?: string;
  iconColor?: string;
}

export interface ToastOptions {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  animation?: ToastAnimation;
  progressBar?: boolean;
  gradient?: [string, string];
  customStyles?: ToastCustomStyles;
  onClose?: () => void;
  theme?: ToastTheme;
  customIcon?: React.ReactNode | string;
  showIcon?: boolean;
  closePosition?: 'top' | 'inline';
}

export interface Toast extends ToastOptions {
  id: string;
  isExiting?: boolean;
}

interface ToasterContextType {
  toasts: Toast[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

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

export const ToasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((options: ToastOptions): string => {
    const id = Math.random().toString(36).substring(2, 11);
    const toast: Toast = {
      id,
      message: options.message,
      type: options.type || 'default',
      position: options.position || 'top-right',
      duration: options.duration || 3000,
      animation: options.animation || 'slide',
      progressBar: options.progressBar !== false,
      gradient: options.gradient,
      customStyles: options.customStyles,
      onClose: options.onClose,
      theme: options.theme || 'light',
      customIcon: options.customIcon,
      showIcon: options.showIcon !== false,
      closePosition: options.closePosition || 'inline',
    };

    setToasts((prev) => [...prev, toast]);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((toast) => 
      toast.id === id ? { ...toast, isExiting: true } : toast
    ));

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

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
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div key={position} className={getPositionClasses(position as ToastPosition)}>
          {positionToasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      ))}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
