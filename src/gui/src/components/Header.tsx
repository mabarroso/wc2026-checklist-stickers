import { useLocation } from 'react-router-dom';

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

  return (
    <header className="mb-6">
      <h2 className="text-4xl font-bold tracking-wider text-[var(--color-yellow)] uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h2>
    </header>
  );
}