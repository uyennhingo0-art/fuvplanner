import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  type: 'error' | 'warning' | 'info';
  message: string;
  dismissible?: boolean;
}

export function AlertBanner({ type, message, dismissible = false }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const config = {
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-3 flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm ${textColor} flex-1`}>{message}</p>
      {dismissible && (
        <button onClick={() => setIsVisible(false)} className={`${iconColor} hover:opacity-70`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
