interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="title">Etkinlik Adı:</label>
      <input
        type="text"
        id="title"
        maxLength={80}
      />

      <label htmlFor="category">Kategori:</label>
      <select id="category" defaultValue="Seminer">
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>

      <label htmlFor="date">Tarih:</label>
      <input type="text" id="date" />

      <label htmlFor="description">Açıklama:</label>
      <textarea id="description" rows={5} />

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default EventForm;