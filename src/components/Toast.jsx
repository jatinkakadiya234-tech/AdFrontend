import React, { useEffect } from 'react';
import { Check, X, Info, AlertCircle } from 'lucide-react';

const variants = {
  success: {
    bg: 'bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-200',
    text: 'text-emerald-800',
    iconBg: 'bg-emerald-500',
    icon: Check
  },
  error: {
    bg: 'bg-gradient-to-br from-red-50 to-rose-50 border border-rose-200',
    text: 'text-rose-800',
    iconBg: 'bg-rose-500',
    icon: AlertCircle
  },
  info: {
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200',
    text: 'text-blue-800',
    iconBg: 'bg-blue-500',
    icon: Info
  }
};

const ToastItem = ({ id, title, message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const { bg, text, iconBg, icon: Icon } = variants[type] || variants.info;

  return (
    <div className={`${bg} rounded-xl shadow-xl p-4 min-w-[320px] backdrop-blur-sm border animate-in slide-in-from-right`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shadow-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className={`font-bold text-base ${text}`}>{title}</div>
          <div className={`text-sm mt-1 ${text} opacity-90 leading-relaxed`}>{message}</div>
        </div>
        <button
          onClick={() => onClose(id)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors ${text}`}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ToastStack = ({ toasts = [], onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={onRemove} />
      ))}
    </div>
  );
};

export default ToastStack;