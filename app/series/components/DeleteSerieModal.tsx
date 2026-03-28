"use client";

import Dialog from "@/components/Dialog";
import { useDeleteSerie } from "../hooks/useDeleteSerie";
import { useState } from "react";

type Props = {
  trigger: React.ReactNode;
  serieId: number;
  onDelete: (id: number) => void;
  onSuccess?: () => void; //para refrescar la lista de productos después de eliminar
};

export default function DeleteSerieModal({
  trigger,
  serieId,
  onDelete,
  onSuccess,
}: Props) {
  const { removeSerie, loading, error } = useDeleteSerie();
  const [isOpen, setIsOpen] = useState(false); // Control local del estado del modal

  const handleDelete = async () => {
    try {
      await removeSerie(serieId);
      setIsOpen(false); // Cerramos el modal después de eliminar
      onDelete(serieId);
      onSuccess?.(); // Llamamos a onSuccess para refrescar la lista de productos
      alert("Elemento eliminado exitosamente");
    } catch {
      alert("Error al eliminar el elemento");
    }
  };

  return (
    <Dialog
      trigger={trigger}
      title="Eliminar elemento"
      description="¿Estás seguro de que deseas eliminar este producto?"
      size="sm"
      open={isOpen} // Controlamos la apertura del modal con el estado local
      onOpenChange={setIsOpen} // Actualizamos el estado local cuando el modal se abra o cierre
      footer={
        <>
          <button className="px-4 py-2 border rounded">Cancelar</button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </>
      }
    >
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <p className="text-gray-600">Esta acción no se puede deshacer.</p>
    </Dialog>
  );
}
