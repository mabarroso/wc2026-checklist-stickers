import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ToastContainer } from './components/Toast';
import { useDisclaimerStore } from './stores/disclaimerStore';

export function AppLayout() {
  const showDisclaimer = useDisclaimerStore((s) => s.show);
  const setShowDisclaimer = useDisclaimerStore((s) => s.setShow);

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)]">
      <Sidebar />
      <main className="app flex-1 min-w-0 overflow-auto pb-20">
        <Outlet />
      </main>
      <DisclaimerModal
        show={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
      <ToastContainer />
    </div>
  );
}