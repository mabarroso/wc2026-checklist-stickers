import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  owned?: boolean;
  duplicate?: boolean;
  missing?: boolean;
}

export function Card({
  children,
  className = '',
  onClick,
  owned = false,
  duplicate = false,
  missing = false,
}: CardProps) {
  let stateClass = '';
  if (owned) stateClass = 'border-2 border-[var(--color-cyan)]';
  if (duplicate) stateClass = 'border-2 border-[var(--color-orange)]';
  if (missing) stateClass = 'grayscale opacity-70';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`rounded-3xl overflow-hidden transition-all duration-220 ${stateClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}