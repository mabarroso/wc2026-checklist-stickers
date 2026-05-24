import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  PlusCircle,
  Repeat,
  BarChart3,
  Search,
  Download,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Colección', icon: LayoutGrid, shortcut: '1' },
  { path: '/mark-owned', label: 'En el álbum', icon: PlusCircle, shortcut: '2' },
  { path: '/mark-duplicate', label: 'Repetidas', icon: Repeat, shortcut: '3' },
  { path: '/statistics', label: 'Estadísticas', icon: BarChart3, shortcut: '4' },
  { path: '/search', label: 'Buscar', icon: Search, shortcut: '5' },
  { path: '/export', label: 'Exportar', icon: Download, shortcut: '6' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <aside className="hidden md:flex w-64 h-screen shrink-0 relative z-20 bg-[var(--color-surface)] border-r border-white/10 flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wider text-[var(--color-blue)]">
            PANINI WC 2026
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onMouseDown={(e) => {
                  if (e.button !== 0 || isActive) {
                    return;
                  }
                  e.preventDefault();
                  navigate(item.path);
                }}
                onClick={() => {
                  if (!isActive) {
                    navigate(item.path);
                  }
                }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--color-blue)]/15 border-l-4 border-[var(--color-blue)] text-[var(--color-blue)]'
                    : 'hover:bg-white/5 text-[var(--color-white)] opacity-70 hover:opacity-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="pointer-events-none">
                  <item.icon size={20} />
                </span>
                <span className="flex-1 font-medium">{item.label}</span>
                <span className="text-xs opacity-50">{item.shortcut}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-[var(--color-white)] opacity-40 text-center">
            Teclado: 1-6 para navegar
          </p>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex md:hidden bg-[var(--color-surface)] border-t border-white/10 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] gap-0.5 transition-all duration-200 ${
                isActive
                  ? 'text-[var(--color-blue)]'
                  : 'text-[var(--color-white)] opacity-50 hover:opacity-80'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={22} />
              <span className="text-[10px] leading-tight font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}