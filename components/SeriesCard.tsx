import React from 'react'

type SeriesCardProps = {
  titulo: string;
  genero: string;
  sinopsis: string;
  urlPortada: string;
  estreno: number;
  calificacion: number;
  plataforma: string;
  actions?: React.ReactNode;
  detailTrigger?: React.ReactNode;
};
        
export default function SeriesCard({
  titulo,
  genero,
  sinopsis,
  urlPortada,
  estreno,
  calificacion,
  plataforma,
  actions,
  detailTrigger
}: SeriesCardProps) {
  return (
    <div className="relative group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">        
        
      {actions && (
        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          {actions}
        </div>
      )}

      <div className="h-90 items-center justify-center bg-black">        
        <div className="absolute top-0 left-0 w-full h-8/9">
          <img
            src={urlPortada}
            alt={titulo}
            className="absolute top-0 left-0 w-full h-8/9"
          />
        </div>

        <div className="flex">            
            <div className="absolute inset-0 bg-gradient-to-t from-[#083a85] via-transparent to-transparent flex flex-col  justify-end text-white">                
                <div className="">
                    <div className="absolute top-2 left-8 bg-yellow-500 text-black px-2 py-1 rounded font-bold text-base">
                        <span className=""> {calificacion}</span>
                    </div>
                    <div className="absolute top-2 left-2">
                        ⭐
                    </div>
                    
                    <h1 className="font-bold text-xl pl-2 pb-2">{titulo}</h1>                    
                    <h2 className="text-white pl-2 pb-2">{estreno} • {genero}</h2>     
                    {detailTrigger && <div className="">{detailTrigger}</div>}               
                </div>
            </div>
        </div>
        
      </div>                  
      
    </div>
    
    
  )
}
