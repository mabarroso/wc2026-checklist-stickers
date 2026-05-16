import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  { path: '/mark-duplicate', label: 'Duplicadas', icon: Repeat, shortcut: '3' },
  { path: '/statistics', label: 'Estadísticas', icon: BarChart3, shortcut: '4' },
  { path: '/search', label: 'Buscar', icon: Search, shortcut: '5' },
  { path: '/export', label: 'Exportar', icon: Download, shortcut: '6' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[var(--color-surface)] border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wider text-[var(--color-cyan)]">
          PANINI WC 2026
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--color-cyan)]/15 border-l-4 border-[var(--color-cyan)] text-[var(--color-cyan)]'
                  : 'hover:bg-white/5 text-[var(--color-white)] opacity-70 hover:opacity-100'
              }`
            }
          >
            <motion.div
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon size={20} />
            </motion.div>
            <span className="flex-1 font-medium">{item.label}</span>
            <span className="text-xs opacity-50">{item.shortcut}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-[var(--color-white)] opacity-40 text-center">
          Teclado: 1-6 para navegar
        </p>
      </div>
    </aside>
  );
}