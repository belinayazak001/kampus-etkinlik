import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article id="etkinlik-detay" className="detay-kart">
      <button type="button" className="btn-sekonder" onClick={onBack}>
        ← Liste ye dön
      </button>
      <h2>{event.title}</h2>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p><strong>Açıklama:</strong> {event.description}</p>
      <button
        type="button"
        className="btn-birincil"
        onClick={() => onEdit(event.id)}
      >
        Güncelle
      </button>
    </article>
  );
}

export default EventDetail;