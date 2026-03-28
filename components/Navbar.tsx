import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (    
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent transition-all duration-300 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-gray-200">
            NextFlix
          </Link>                    
        </div>

        <div className="flex item-center gap-6 text-gray-200 font-medium">
          <Link href="/" className="hover:font-bold text-white transition">
            Inicio
          </Link>
          <Link href="/series" className="hover:font-bold transition">
            Series
          </Link>
          <Link href="/about" className="hover:font-bold transition">
            Acerca de
          </Link>
        </div>
        
      </div>
    </nav>



  )
}
