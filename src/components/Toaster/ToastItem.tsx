import React, { useEffect, useState } from 'react';
import { Toast, ToastAnimation } from '@/contexts/ToasterContext';
import { X, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import './toaster.css';

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
        bg: '#22c55e',
        text: '#ffffff',
        border: '#22c55e'
      };
    case 'error':
      return {
        bg: '#ef4444',
        text: '#ffffff',
        border: '#ef4444'
      };
    case 'warning':
      return {
        bg: '#f59e0b',
        text: '#ffffff',
        border: '#f59e0b'
      };
    case 'info':
      return {
        bg: '#3b82f6',
        text: '#ffffff',
        border: '#3b82f6'
      };
    default:
      return {
        bg: '#64748b',
        text: '#ffffff',
        border: '#e2e8f0'
      };
  }
};


const getTypeIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 />;
    case 'error':
      return <XCircle />;
    case 'warning':
      return <AlertCircle />;
    case 'info':
      return <Info />;
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
    width: toast.customStyles?.width,
    height: toast.customStyles?.height,
    boxShadow: toast.customStyles?.boxShadow,
    border: toast.customStyles?.border || `2px solid ${isLightTheme ? typeColors.bg : typeColors.border}`,
    fontWeight: toast.customStyles?.fontWeight || '500',
    fontStyle: toast.customStyles?.fontStyle || 'normal',
  };
  
  const iconColor = toast.customStyles?.iconColor || (isLightTheme ? typeColors.bg : typeColors.text);
  const progressBarColor = toast.customStyles?.progressBarColor || (isLightTheme ? (toast.type === 'default' ? '#000000' : typeColors.bg) : (toast.type === 'default' ? '#000000' : '#ffffff'));

  const gradientStyle = toast.gradient
    ? {
        background: `linear-gradient(135deg, ${toast.gradient[0]}, ${toast.gradient[1]})`,
      }
    : {};

  const is3D = toast.customStyles?.boxShadow?.includes('20px');

  return (
    <div
      className={`toast-item ${is3D ? 'toast-item-3d' : ''} ${animationClass}`}
      style={{ 
        ...baseStyles, 
        ...gradientStyle,
        width: toast.customStyles?.width,
        borderRadius: toast.customStyles?.borderRadius,
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
          className="toast-close-top"
          aria-label="Close notification"
        >
          <X />
        </button>
      )}
      
      <div 
        className="toast-content"
        style={{ padding: toast.customStyles?.padding || '8px' }}
      >
        {toast.showIcon && (
          <div className="toast-icon" style={{ color: iconColor }}>
            {typeof toast.customIcon === 'string' ? (
              <img 
                src={toast.customIcon} 
                alt="toast icon"
              />
            ) : (
              toast.customIcon || getTypeIcon(toast.type || 'default')
            )}
          </div>
        )}
        <div className="toast-message" style={{ marginRight: toast.closePosition === 'inline' ? '0' : '14px' }}>
          <p style={{ margin: 0, lineHeight: '1.5', wordBreak: 'break-word' }}>{toast.message}</p>
        </div>
        {toast.closePosition === 'inline' && (
          <button
            onClick={onClose}
            className="toast-close-inline"
            aria-label="Close notification"
          >
            <X />
          </button>
        )}
      </div>
      
      {toast.progressBar && (
        <div className="toast-progress-container">
          <div
            className="toast-progress-bar"
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
