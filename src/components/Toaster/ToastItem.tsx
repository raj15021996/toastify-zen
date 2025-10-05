import React, { useEffect, useState } from 'react';
import { Toast, ToastAnimation } from '@/contexts/ToasterContext';
import { X, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const getAnimationClass = (animation: ToastAnimation, isExiting: boolean, position: string): string => {
  if (animation === 'fade') {
    return isExiting ? 'animate-toast-fade-out' : 'animate-toast-fade-in';
  }
  
  if (animation === 'slide') {
    if (position.includes('right')) {
      return isExiting ? 'animate-toast-slide-out-right' : 'animate-toast-slide-in-right';
    }
    if (position.includes('left')) {
      return isExiting ? 'animate-toast-slide-out-left' : 'animate-toast-slide-in-left';
    }
    if (position.includes('top')) {
      return isExiting ? 'animate-toast-slide-out-top' : 'animate-toast-slide-in-top';
    }
    return isExiting ? 'animate-toast-slide-out-bottom' : 'animate-toast-slide-in-bottom';
  }
  
  if (animation === 'zoom') {
    return isExiting ? 'animate-toast-zoom-out' : 'animate-toast-zoom-in';
  }
  
  if (animation === 'bounce') {
    return isExiting ? 'animate-toast-bounce-out' : 'animate-toast-bounce-in';
  }
  
  return isExiting ? 'animate-toast-fade-out' : 'animate-toast-fade-in';
};

const getTypeColors = (type: string) => {
  switch (type) {
    case 'success':
      return {
        bg: 'hsl(var(--toaster-success))',
        text: 'hsl(var(--toaster-success-foreground))',
        border: 'hsl(var(--toaster-success))'
      };
    case 'error':
      return {
        bg: 'hsl(var(--toaster-error))',
        text: 'hsl(var(--toaster-error-foreground))',
        border: 'hsl(var(--toaster-error))'
      };
    case 'warning':
      return {
        bg: 'hsl(var(--toaster-warning))',
        text: 'hsl(var(--toaster-warning-foreground))',
        border: 'hsl(var(--toaster-warning))'
      };
    case 'info':
      return {
        bg: 'hsl(var(--toaster-info))',
        text: 'hsl(var(--toaster-info-foreground))',
        border: 'hsl(var(--toaster-info))'
      };
    default:
      return {
        bg: 'hsl(var(--toaster-default))',
        text: 'hsl(var(--toaster-default-foreground))',
        border: 'hsl(var(--border))'
      };
  }
};

const getTypeStyles = (type: string) => {
  const colors = getTypeColors(type);
  return `bg-[${colors.bg}] text-[${colors.text}] border-[${colors.border}]`;
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 flex-shrink-0" />;
    case 'error':
      return <XCircle className="h-5 w-5 flex-shrink-0" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
    case 'info':
      return <Info className="h-5 w-5 flex-shrink-0" />;
    default:
      return null;
  }
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const animationClass = getAnimationClass(
    toast.animation || 'slide',
    toast.isExiting || false,
    toast.position || 'top-right'
  );

  useEffect(() => {
    if (toast.progressBar && !toast.isExiting) {
      const startTime = Date.now();
      const duration = toast.duration || 3000;
      let pausedTime = 0;
      let pauseStartTime = 0;
      
      const interval = setInterval(() => {
        if (isPaused) {
          if (pauseStartTime === 0) {
            pauseStartTime = Date.now();
          }
          return;
        }
        
        if (pauseStartTime > 0) {
          pausedTime += Date.now() - pauseStartTime;
          pauseStartTime = 0;
        }
        
        const elapsed = Date.now() - startTime - pausedTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 10);
      
      return () => clearInterval(interval);
    }
  }, [toast.progressBar, toast.duration, toast.isExiting, isPaused]);

  const typeColors = getTypeColors(toast.type || 'default');
  
  const baseStyles: React.CSSProperties = {
    backgroundColor: toast.customStyles?.backgroundColor || typeColors.bg,
    color: toast.customStyles?.textColor || typeColors.text,
    borderColor: typeColors.border,
    fontSize: toast.customStyles?.fontSize || '14px',
    borderRadius: toast.customStyles?.borderRadius || '0.5rem',
    width: toast.customStyles?.width,
    height: toast.customStyles?.height,
    boxShadow: toast.customStyles?.boxShadow,
    border: toast.customStyles?.border || `2px solid ${typeColors.border}`,
    fontWeight: toast.customStyles?.fontWeight || '500',
    fontStyle: toast.customStyles?.fontStyle || 'normal',
  };

  const gradientStyle = toast.gradient
    ? {
        background: `linear-gradient(135deg, ${toast.gradient[0]}, ${toast.gradient[1]})`,
      }
    : {};

  const is3D = toast.customStyles?.boxShadow?.includes('20px');

  return (
    <div
      className={`
        ${animationClass}
        overflow-hidden pointer-events-auto
        relative backdrop-blur-sm
        ${is3D ? 'shadow-2xl transform-gpu hover:scale-105 transition-all duration-300' : 'shadow-lg'}
      `}
      style={{ 
        ...baseStyles, 
        ...gradientStyle,
        width: toast.customStyles?.width || '250px',
        transform: is3D ? 'perspective(1200px) rotateX(3deg) translateZ(20px)' : undefined,
        boxShadow: is3D 
          ? `0 25px 50px -12px ${typeColors.bg.replace(')', ' / 0.4)')}, 0 0 30px ${typeColors.bg.replace(')', ' / 0.2)')}, inset 0 2px 4px rgba(255,255,255,0.2)`
          : baseStyles.boxShadow,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex items-start gap-1.5"
        style={{ padding: toast.customStyles?.padding || '12px' }}
      >
        {getTypeIcon(toast.type || 'default')}
        <div className="flex-1 pt-0.5">
          <p style={{ margin: 0, lineHeight: '1.5', wordBreak: 'break-word' }}>{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {toast.progressBar && (
        <div className="h-1 bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-[hsl(var(--toaster-progress))] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
