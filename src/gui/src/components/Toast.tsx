import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore, type ToastVariant } from '../stores/toastStore';

const iconMap: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const borderMap: Record<ToastVariant, string> = {
  success: 'border-l-[var(--color-green)]',
  error: 'border-l-[var(--color-red)]',
  info: 'border-l-[var(--color-cyan)]',
};

const colorMap: Record<ToastVariant, string> = {
  success: 'text-[var(--color-green)]',
  error: 'text-[var(--color-red)]',
  info: 'text-[var(--color-cyan)]',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.variant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center gap-3 bg-[var(--color-surface)] border border-white/10 border-l-4 ${borderMap[toast.variant]} rounded-xl px-4 py-3 shadow-lg max-w-sm w-[90vw]`}
            >
              <Icon size={20} className={`shrink-0 ${colorMap[toast.variant]}`} />
              <p className="flex-1 text-sm text-[var(--color-white)]">{toast.message}</p>
              {toast.undoAction && (
                <button
                  onClick={() => {
                    toast.undoAction?.();
                    removeToast(toast.id);
                  }}
                  className="text-xs font-semibold text-[var(--color-cyan)] hover:opacity-80 min-h-[44px] px-2"
                >
                  Deshacer
                </button>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[var(--color-white)] opacity-50 hover:opacity-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
