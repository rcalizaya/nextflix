"use client";import React from 'react'
import SeriesCard from '@/components/SeriesCard'
import { UseGetSerie } from "./hooks/useGetSerie";
import { useState } from "react";
import SerieDetailModal from "./components/SerieDetailModal";
import { Pencil, Trash2 } from "lucide-react";
import SerieFormModal from "./components/SerieFormModal";
import DeleteSerieModal from "./components/DeleteSerieModal";
import CategoryFilter from "./components/CategoryFilter";

export default function SeriesPage() {
  const { series, loading, error, refetch } = UseGetSerie();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    ...new Set(series.map((serie) => serie.genero)),
  ];

  const filteredSeries =
    selectedCategory === "all"
      ? series
      : series.filter((serie) => serie.genero === selectedCategory);

  return (
    <div className="pt-20 bg-[#121212]">
      <h1 className="text-3xl font-bold mb-8 text-white pl-5">Catalogo de Series</h1>

      <SerieFormModal
        trigger={
          <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded">
            Agregar 
          </button>
        }
        onSuccess={refetch} // Refrescamos la lista de productos después de agregar uno nuevo
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#121212] pl-2">
        {loading ? (
          <p className="text-black">Cargando ...</p>
        ) : error ? (
          <p className="text-red-500">Error al cargar los elementos</p>
        ) : (
          filteredSeries.map((serie) => (
            <SeriesCard
              key={serie.id}
              titulo= {serie.titulo}
              genero={serie.genero}
              sinopsis={serie.sinopsis}
              urlPortada={serie.urlPortada}
              estreno={serie.estreno}
              calificacion={serie.calificacion}
              plataforma={serie.plataforma}
              actions={
                <>
                  <SerieFormModal
                    serie={serie}
                    trigger={
                      <button className="text-blue-600 flex items-center gap-1 text-sm">
                        <Pencil size={16} />
                      </button>
                    }
                    onSuccess={refetch} // Refrescamos la lista de productos después de editar uno
                  />

                  <DeleteSerieModal
                    serieId={serie.id}
                    onDelete={(id) => console.log("delete", id)}
                    trigger={
                      <button className="text-red-600 flex items-center gap-1 text-sm">
                        <Trash2 size={16} />
                      </button>
                    }
                    onSuccess={refetch} // Refrescamos la lista de productos después de eliminar uno
                  />
                </>
              }
              detailTrigger={
                <SerieDetailModal
                  serie={serie}
                  trigger={                    
                    <button className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                      Ver detalles
                    </button>
                    
                  }
                />
              }
            />
          ))
        )}
      </div>
    </div>    
  )
}
