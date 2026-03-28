"use client";

import Dialog from "@/components/Dialog";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PostSerieRequest } from "../interfaces/postserie.interface";
import { usePostSerie } from "../hooks/usePostSerie";
import { safeParse } from "valibot";
import { serieSchema } from "../../../validations/serie.schema";

type Props = {
  trigger: React.ReactNode;
  serie?: PostSerieRequest;
  onSuccess?: () => void; //para refrescar la lista de productos después de crear o editar
};

export default function SerieFormModal({
  trigger,
  serie,
  onSuccess,
}: Props) {
  const { createSerie, loading, error } = usePostSerie();
  const [isOpen, setIsOpen] = useState(false); // Control local del estado del modal
  const [titulo, setTitulo] = useState(serie?.titulo ?? "");
  const [sinopsis, setSinopsis] = useState(serie?.sinopsis ?? "");
  const [estreno, setEstreno] = useState(serie?.estreno ?? 0);
  const [genero, setGenero] = useState(serie?.genero ?? "");
  const [urlPortada, setUrlPortada] = useState(serie?.urlPortada ?? "");
  const [calificacion, setCalificacion] = useState(serie?.calificacion ?? 0);
  const [plataforma, setPlataforma] = useState(serie?.plataforma ?? "");

  //const [count, setCount] = useState(product?.rating?.count ?? 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  

  const validateField = (fieldName: string, fieldValue: string | number) => {
    
    const updatedPayload: PostSerieRequest = {
      titulo: fieldName === "titulo" ? (fieldValue as string) : titulo,
      sinopsis:
        fieldName === "sinopsis" ? (fieldValue as string) : sinopsis,
      estreno: fieldName === "estreno" ? (fieldValue as number) : estreno,
      genero: fieldName === "genero" ? (fieldValue as string) : genero,
      urlPortada: fieldName === "urlPortada" ? (fieldValue as string) : urlPortada,
      calificacion: fieldName === "calificacion" ? (fieldValue as number) : calificacion,
      plataforma: fieldName === "plataforma" ? (fieldValue as string) : plataforma,
      
    };

    const result = safeParse(serieSchema, updatedPayload); // Validar el payload actualizado
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.issues.forEach((issue) => {
        const field = issue.path?.[0]?.key;
        if (typeof field === "string" && field.length > 0) {
          fieldErrors[field] = issue.message;
        }
      });

      // Solo actualizar el error del campo que se está validando
      setErrors((prev) => ({
        ...prev,
        [fieldName]: fieldErrors[fieldName] || "",
      }));
    } else {
      // Si la validación es exitosa, limpiar el error de este campo
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const payload: PostSerieRequest = {
        titulo,
        genero,
        sinopsis,
        urlPortada,
        estreno,
        calificacion,
        plataforma,
    };
    
  

    const result = safeParse(serieSchema, payload);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.issues.forEach((issue) => {
        const field = issue.path?.[0]?.key;
        if (typeof field === "string" && field.length > 0) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await createSerie(payload);
      alert("Creado exitosamente");
      setIsOpen(false); // Cerramos el modal después de crear el producto
      onSuccess?.(); // Llamamos a onSuccess para refrescar la lista de productos
    } catch {
      alert("Error al intentar crear");
    }
  };

  const inputStyle =
    "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <Dialog
      trigger={trigger}
      title={serie ? "Editar producto" : "Crear producto"}
      description="Completa la información del producto."
      size="md"
      open={isOpen} // Controlamos la apertura del modal con el estado local
      onOpenChange={setIsOpen} // Actualizamos el estado local cuando el modal se abra o cierre
      footer={
        <div className="flex gap-3 justify-end">
          <DialogPrimitive.Close asChild>
            <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">
              Cancelar
            </button>
          </DialogPrimitive.Close>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-sm"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {error && (
          <p className="text-red-500 col-span-1 md:col-span-2 text-sm">
            {error}
          </p>
        )}
        {/* Titutlo */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Título de la serie</label>
          <input
            className={inputStyle}
            placeholder="Serie premium"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              validateField("titulo", e.target.value);
            }}
          />
          {errors.titulo && (
            <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>
          )}
        </div>

        {/* Sinopsis */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Sinopsis
          </label>
          <textarea
            className={inputStyle + " resize-none"}
            rows={3}
            placeholder="Describe la serie..."
            value={sinopsis}
            onChange={(e) => {
              setSinopsis(e.target.value);
              validateField("sinopsis", e.target.value);
            }}
          />
          {errors.sinopsis && (
            <p className="text-red-500 text-xs mt-1">{errors.sinopsis}</p>
          )}
        </div>

        {/* Año estreno */}
        <div>
          <label className="text-sm font-medium text-gray-700">Estreno</label>
          <input
            type="number"
            className={inputStyle}
            placeholder="0.00"
            value={estreno}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setEstreno(newValue);
              validateField("estreno", newValue);
            }}
          />
          {errors.estreno && (
            <p className="text-red-500 text-xs mt-1">{errors.estreno}</p>
          )}
        </div>

        {/* genero */}
        <div>
          <label className="text-sm font-medium text-gray-700">Genero</label>
          <input
            className={inputStyle}
            placeholder="Ej: comedia"
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
              validateField("genero", e.target.value);
            }}
          />
          {errors.genero && (
            <p className="text-red-500 text-xs mt-1">{errors.genero}</p>
          )}
        </div>

        {/* Portada */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            URL de la portada
          </label>
          <input
            className={inputStyle}
            placeholder="https://..."
            value={urlPortada}
            onChange={(e) => {
              setUrlPortada(e.target.value);
              validateField("urlPortada", e.target.value);
            }}
          />
          {errors.urlPortada && (
            <p className="text-red-500 text-xs mt-1">{errors.urlPortada}</p>
          )}
        </div>

        {/* RATING */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Calificacion
          </label>
          <input
            type="number"
            step="0.1"
            className={inputStyle}
            placeholder="4.5"
            value={calificacion}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setCalificacion(newValue);
              validateField("calificacion", newValue);
            }}
          />
          {errors.calificacion && (
            <p className="text-red-500 text-xs mt-1">{errors.calificacion}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Plataforma
          </label>
          <input
            className={inputStyle}
            placeholder="Ej: NextFlix"
            value={plataforma}
            onChange={(e) => {
              setPlataforma(e.target.value);
              validateField("plataforma", e.target.value);
            }}
          />

          {errors.plataforma && (
            <p className="text-red-500 text-xs mt-1">{errors.plataforma}</p>
          )}          

        </div>
      </div>
    </Dialog>
  );
}
