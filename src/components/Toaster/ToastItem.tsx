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
  
  if (animation === 'rotate') {
    return isExiting ? 'animate-toast-rotate-out' : 'animate-toast-rotate-in';
  }
  
  if (animation === 'flip') {
    return isExiting ? 'animate-toast-flip-out' : 'animate-toast-flip-in';
  }
  
  if (animation === 'swing') {
    return isExiting ? 'animate-toast-swing-out' : 'animate-toast-swing-in';
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
  const [remainingTime, setRemainingTime] = useState(toast.duration || 3000);
  const animationClass = getAnimationClass(
    toast.animation || 'slide',
    toast.isExiting || false,
    toast.position || 'top-right'
  );

  // Auto-dismiss timer with pause on hover - fixed to resume from where it paused
  useEffect(() => {
    if (toast.isExiting || isPaused) return;
    
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 100;
        if (newTime <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return newTime;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [toast.isExiting, isPaused, onClose]);

  // Progress bar animation - synced with remaining time
  useEffect(() => {
    if (toast.progressBar && !toast.isExiting) {
      const duration = toast.duration || 3000;
      const percentage = (remainingTime / duration) * 100;
      setProgress(Math.max(0, percentage));
    }
  }, [toast.progressBar, toast.duration, toast.isExiting, remainingTime]);

  const typeColors = getTypeColors(toast.type || 'default');
  const isLightTheme = toast.theme === 'light';
  
  const baseStyles: React.CSSProperties = {
    backgroundColor: toast.customStyles?.backgroundColor || (isLightTheme ? '#ffffff' : typeColors.bg),
    color: toast.customStyles?.textColor || (isLightTheme ? '#000000' : typeColors.text),
    borderColor: isLightTheme ? typeColors.bg : typeColors.border,
    fontSize: toast.customStyles?.fontSize || '14px',
    borderRadius: toast.customStyles?.borderRadius || '0.5rem',
    width: toast.customStyles?.width,
    height: toast.customStyles?.height,
    boxShadow: toast.customStyles?.boxShadow,
    border: toast.customStyles?.border || `2px solid ${isLightTheme ? typeColors.bg : typeColors.border}`,
    fontWeight: toast.customStyles?.fontWeight || '500',
    fontStyle: toast.customStyles?.fontStyle || 'normal',
  };
  
  const iconColor = toast.customStyles?.iconColor || (isLightTheme ? typeColors.bg : typeColors.text);
  const progressBarColor = toast.customStyles?.progressBarColor || (isLightTheme ? typeColors.bg : 'hsl(var(--toaster-progress))');

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
      {toast.closePosition === 'top' && (
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 rounded-full p-1 bg-background border border-border hover:bg-muted transition-colors shadow-md z-10"
          aria-label="Close notification"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      
      <div 
        className="flex items-start gap-1.5"
        style={{ padding: toast.customStyles?.padding || '12px' }}
      >
        {toast.showIcon && (
          <div style={{ color: iconColor }}>
            {toast.customIcon || getTypeIcon(toast.type || 'default')}
          </div>
        )}
        <div className="flex-1 pt-0.5" style={{ marginRight: toast.closePosition === 'inline' ? '0' : '8px' }}>
          <p style={{ margin: 0, lineHeight: '1.5', wordBreak: 'break-word' }}>{toast.message}</p>
        </div>
        {toast.closePosition === 'inline' && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {toast.progressBar && (
        <div className="h-1 bg-black/10 dark:bg-white/10">
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{ 
              width: `${progress}%`,
              backgroundColor: progressBarColor
            }}
          />
        </div>
      )}
    </div>
  );
};
