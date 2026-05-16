import type { ReactNode } from 'react';
import { useKeyboardNavigation } from './hooks';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  useKeyboardNavigation();
  return <>{children}</>;
}