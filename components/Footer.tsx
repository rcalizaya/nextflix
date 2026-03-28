import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Marca */}

        <div>
          <h3 className="text-xl font-bold text-white mb-3">NextFLIX</h3>

          <p className="text-sm text-gray-400">            
            Es el servicio con las series de éxito, contenido original y los programas del momento. Es una montaña de entretenimiento.
          </p>
        </div>

        {/* Links */}

        <div>
          <h4 className="font-semibold text-white mb-4">Navegación</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-white">
                Series
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-white">
                Acerca de
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}

        <div>
          <h4 className="font-semibold text-white mb-4">Contacto</h4>

          <p className="text-sm text-gray-400">soporte@nextshop.com</p>

          <p className="text-sm text-gray-400">La Paz, Bolivia</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500">
        © {new Date().getFullYear()} NextFlix — Todos los derechos reservados
      </div>
    </footer>
  )
}
