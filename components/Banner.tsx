import Link from 'next/link';
import React from 'react'

export default function Banner() {
  return (
    <div className="relative h-[85vh] w-full">
      {/* https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w828-q80/cbs_page_attribute/18/16/image_89a9d29b-1313-4c36-b5e7-6db6adf7da06.jpg */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-[url(https://static.wikia.nocookie.net/doblaje/images/e/e1/POSTERgigantesdeaceroGDE.jpg/revision/latest?cb=20110831010208&path-prefix=es)] ..."
        
      />
      {/* Gradientes para oscurecer y fusionar con el fondo */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#083a85] via-transparent to-transparent" />

      <div className="absolute bottom-[15%] left-12 max-w-2xl text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          Encuentra las mejores series
        </h1>
        <p className="text-lg text-gray-200 mb-6 drop-shadow-md line-clamp-3">
          Descubre nuestra colección de series con los mejores precios y la mejor calidad
        </p>
        <Link
            href="/series"
            className=" bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-bold transition"            
          >
            Ver Series
        </Link>        
      </div>
    </div>

    
  );
;}
