import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MoreVertical, Sun, Moon, Monitor, FileText, Info, Flag, Check } from 'lucide-react';
import { useTheme } from '../stores/ThemeContext';
import { useDisclaimerStore } from '../stores/disclaimerStore';
import { useFlagStore } from '../stores/flagStore';
const APP_VERSION = '1.2.0';

const titles: Record<string, string> = {
  '/': 'Ver Colección',
  '/mark-owned': 'Marcar En el álbum',
  '/mark-duplicate': 'Marcar Duplicadas',
  '/statistics': 'Estadísticas',
  '/search': 'Buscar',
  '/export': 'Exportar',
};

export function Header() {
  const location = useLocation();
  const title = titles[location.pathname] || 'Colección';
  const { themeSetting, setThemeSetting } = useTheme();
  const setShowDisclaimer = useDisclaimerStore((s) => s.setShow);
  const { showFlags, toggleFlags } = useFlagStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  function handleSelectTheme(setting: 'auto' | 'dark' | 'light') {
    setThemeSetting(setting);
    setMenuOpen(false);
  }

  function handleToggleFlags() {
    toggleFlags();
    setMenuOpen(false);
  }

  function handleShowDisclaimer() {
    setShowDisclaimer(true);
    setMenuOpen(false);
  }

  function handleShowAbout() {
    setAboutOpen(true);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h2 className="header mb-0">{title}</h2>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[var(--color-white)] opacity-60 hover:opacity-100 hover:bg-[var(--color-hover)] transition-all"
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <MoreVertical size={22} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 min-w-[240px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-xl">
              <div className="px-4 pt-3 pb-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Tema
              </div>
              <button
                onClick={() => handleSelectTheme('auto')}
                className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm transition-colors ${
                  themeSetting === 'auto'
                    ? 'text-[var(--color-cyan)]'
                    : 'text-[var(--color-white)] hover:bg-[var(--color-hover)]'
                }`}
              >
                <Monitor size={18} />
                <span className="flex-1">Auto</span>
                {themeSetting === 'auto' && <Check size={16} />}
              </button>
              <button
                onClick={() => handleSelectTheme('light')}
                className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm transition-colors ${
                  themeSetting === 'light'
                    ? 'text-[var(--color-cyan)]'
                    : 'text-[var(--color-white)] hover:bg-[var(--color-hover)]'
                }`}
              >
                <Sun size={18} />
                <span className="flex-1">Claro</span>
                {themeSetting === 'light' && <Check size={16} />}
              </button>
              <button
                onClick={() => handleSelectTheme('dark')}
                className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm transition-colors ${
                  themeSetting === 'dark'
                    ? 'text-[var(--color-cyan)]'
                    : 'text-[var(--color-white)] hover:bg-[var(--color-hover)]'
                }`}
              >
                <Moon size={18} />
                <span className="flex-1">Oscuro</span>
                {themeSetting === 'dark' && <Check size={16} />}
              </button>

              <div className="h-px bg-[var(--color-border-light)] mx-2" />

              <button
                onClick={handleToggleFlags}
                className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm text-[var(--color-white)] hover:bg-[var(--color-hover)] transition-colors"
              >
                <Flag size={18} />
                <span className="flex-1">{showFlags ? 'Ocultar bandera países' : 'Mostrar bandera países'}</span>
              </button>

              <div className="h-px bg-[var(--color-border-light)] mx-2" />

              <button
                onClick={handleShowDisclaimer}
                className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm text-[var(--color-white)] hover:bg-[var(--color-hover)] transition-colors"
              >
                <FileText size={18} />
                <span className="flex-1">Aviso legal</span>
              </button>

              <div className="h-px bg-[var(--color-border-light)] mx-2" />

              <button
                onClick={handleShowAbout}
                className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left text-sm text-[var(--color-white)] hover:bg-[var(--color-hover)] transition-colors"
              >
                <Info size={18} />
                <span className="flex-1">Acerca de</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {aboutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[var(--color-white)] mb-2">
              WC 2026 Checklist
            </h3>
            <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
              v{APP_VERSION}
            </p>
            <p className="text-sm text-[var(--color-white)] opacity-80 mb-6">
              Aplicación para gestionar tu colección de cromos del Mundial 2026.
            </p>
            <button
              onClick={() => setAboutOpen(false)}
              className="w-full py-3 min-h-[44px] rounded-xl bg-[var(--blue)] text-white font-semibold hover:brightness-110 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
