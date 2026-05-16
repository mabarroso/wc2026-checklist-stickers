import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const shortcuts: Record<string, string> = {
  '1': '/',
  '2': '/mark-owned',
  '3': '/mark-duplicate',
  '4': '/statistics',
  '5': '/search',
  '6': '/export',
};

export function useKeyboardNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const route = shortcuts[e.key];
      if (route) {
        navigate(route);
      }

      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        navigate('/search');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}