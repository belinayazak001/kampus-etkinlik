import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";
interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)} {event.time}</p>
      {event.location && <p><strong>Yer:</strong> {event.location}</p>}
      {event.capacity !== undefined && (
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      )}
      <button type="button" onClick={() => onShowDetail(event.id)}>
        Detaya git
      </button>
    </article>
  );
}

export default EventCard;