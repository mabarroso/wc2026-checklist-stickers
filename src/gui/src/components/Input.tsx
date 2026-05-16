import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-[var(--color-white)] opacity-70">
          {label}
        </label>
      )}
      <input className={`input-gui ${className}`} {...props} />
    </div>
  );
}