"use client";

import Dialog from "@/components/Dialog";

type SerieModalProps = {
  titulo: string;
  sinopsis: string;
};

export default function ProductModal({
  titulo,
  sinopsis,
}: SerieModalProps) {
  return (
    <Dialog
      trigger={
        <button className="px-4 py-2 bg-blue-600 text-black rounded">
          Ver Detalles
        </button>
      }
    >
      <h2>{titulo}</h2>
      <p>{sinopsis}</p>
    </Dialog>
  );
}
