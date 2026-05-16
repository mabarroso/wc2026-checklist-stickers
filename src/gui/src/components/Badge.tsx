import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'cyan' | 'yellow' | 'red' | 'green' | 'orange';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--color-surface-2)] text-[var(--color-white)]',
  cyan: 'bg-[var(--color-cyan)] text-[var(--color-bg)]',
  yellow: 'bg-[var(--color-yellow)] text-[var(--color-bg)]',
  red: 'bg-[var(--color-red)] text-[var(--color-white)]',
  green: 'bg-[var(--color-green)] text-[var(--color-bg)]',
  orange: 'bg-[var(--color-orange)] text-[var(--color-white)]',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-bold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}