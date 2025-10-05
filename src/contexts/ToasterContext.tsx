import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastAnimation = 'fade' | 'slide' | 'zoom' | 'bounce';
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

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

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
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
