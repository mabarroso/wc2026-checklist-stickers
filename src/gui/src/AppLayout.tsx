import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DisclaimerModal } from './components/DisclaimerModal';

export function AppLayout() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      <Sidebar />
      <main className="app flex-1 min-w-0 overflow-auto pb-16">
        <Outlet />
      </main>
      <DisclaimerModal
        show={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
}