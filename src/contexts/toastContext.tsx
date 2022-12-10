import React, { useState, useContext, useCallback } from 'react';
import { StyleVariant } from '../components/atoms/Button/Button';
import Toast from '../components/molecules/Toast/Toast';
import generateRandomString from '../utils/randomStrings';
export type ToastType = {
  id: string;
  message: string;
  variant: StyleVariant;
};
export type ToastContextType = {
  toasts: ToastType[];
  onClose: (id: string) => void;
  onToast: (message: string, variant: StyleVariant, autoClose?: boolean) => void;
};
//! FOR alert banner toasts.
const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  onClose: () => {},
  onToast: () => {},
});

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const onClose = useCallback((id: string) => {
    setToasts((toast) => toast.filter((e) => e.id !== id));
  }, []);
  const onToast = useCallback((message: string, variant: StyleVariant, autoClose?: boolean) => {
    setToasts((prev) => [...prev, { id: generateRandomString(16), message, variant, autoClose: autoClose ?? false }]);
  }, []);
  return (
    <ToastContext.Provider value={{ toasts, onClose, onToast }}>
      {!!toasts.length && (
        <div className="fixed p-2 flex flex-col gap-1 z-50 top-0 left-1/2 translate-x-[-50%]">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={onClose} />
          ))}
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast can only be used inside a ToastContextProvider');
  }
  return context;
};
