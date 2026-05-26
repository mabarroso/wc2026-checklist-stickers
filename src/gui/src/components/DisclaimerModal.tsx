import { motion, AnimatePresence } from 'framer-motion';

interface DisclaimerModalProps {
  show: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ show, onClose }: DisclaimerModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-[var(--bg-card)] p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-bold mb-4">Aviso legal</h2>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Esta aplicación es un proyecto independiente desarrollado con fines informativos y de gestión personal de colecciones.
              <br /><br />
              No existe ninguna afiliación, asociación ni respaldo por parte de Panini S.p.A., la FIFA (Fédération Internationale de Football Association) ni ninguna de sus entidades relacionadas.
              <br /><br />
              No se utilizan logos, marcas registradas, imágenes oficiales ni contenido protegido por derechos de autor pertenecientes a dichas entidades.
              <br /><br />
              Todas las marcas comerciales y nombres mencionados son propiedad de sus respectivos titulares.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[var(--color-cyan)] text-black font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
