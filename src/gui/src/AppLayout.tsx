import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}