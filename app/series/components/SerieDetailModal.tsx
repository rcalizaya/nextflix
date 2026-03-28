import Dialog from "@/components/Dialog";

type Serie = {
  id: number;
  titulo: string;
  sinopsis: string;
  urlPortada: string;
  estreno: number;
  calificacion: string;
};

type Props = {
  serie: Serie;
  trigger: React.ReactNode;
};

export default function SerieDetailModal({ serie, trigger }: Props) {
  return (
    <Dialog
      trigger={trigger}
      title={serie.titulo}
      description={serie.sinopsis}
      image={serie.urlPortada}
      size="md"
      footer={<p className="font-semibold text-lg">Calificación: {serie.calificacion} ⭐</p>}
    >
      <div className="font-semibold">Fecha de estreno: </div>
      <p>{serie.estreno}</p>
      <div className="font-semibold">Genero:</div>
      <p>{serie.genero}</p>
      <div className="font-semibold">Plataformas:</div>
      <p>{serie.plataforma}</p>
      
    </Dialog>
  );
}
