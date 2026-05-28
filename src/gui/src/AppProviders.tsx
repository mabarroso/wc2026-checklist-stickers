import type { ReactNode } from 'react';
import { useKeyboardNavigation } from './hooks';
import { ThemeProvider } from './stores/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  useKeyboardNavigation();
  return <ThemeProvider>{children}</ThemeProvider>;
}