import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      <Sidebar />
      <main className="app flex-1 min-w-0 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
}