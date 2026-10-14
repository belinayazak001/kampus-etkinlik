import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/campus-events";
import type { Category } from "./types/campus-events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

export function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const go = (nextPage: PageName, id: string | null = null) => {
    setPage(nextPage);
    setSelectedId(id);
  };

  useEffect(() => {
    if (page === "detail" && selectedId) {
      const currentEvent = findEventById(events, selectedId);
      document.title = `Kampüs Etkinlikleri — ${currentEvent?.title ?? "Detay"}`;
    } else {
      document.title = "Kampüs Etkinlikleri — Kariyer Günleri 2026";
    }
  }, [page, selectedId]);

  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <div className="container">
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav className="menu">
          <button
            type="button"
            aria-current={page === "home" ? "page" : undefined}
            onClick={() => go("home")}
          >
            Ana Sayfa
          </button>{" "}
          |{" "}
          <button
            type="button"
            aria-current={page === "events" ? "page" : undefined}
            onClick={() => go("events")}
          >
            Etkinlikler
          </button>{" "}
          |{" "}
          <button
            type="button"
            aria-current={page === "add" ? "page" : undefined}
            onClick={() => go("add")}
          >
            Etkinlik Ekle
          </button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section id="etkinlik-listesi" className="cards-grid grid-3">
            <h2>Yaklaşan Etkinlikler</h2>
            <div className="grid">
              {upcomingEvents.map((event) => (
                <article key={event.id} className="kart">
                  <h3>{event.title}</h3>
                  <p><strong>Kategori:</strong> {event.category}</p>
                  <p><strong>Tarih:</strong> {event.date} {event.time}</p>
                  <p><strong>Yer:</strong> {event.location}</p>
                  <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
                  <button type="button" onClick={() => go("detail", event.id)}>
                    Detaya git
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "events" && (
          <section>
            <form id="filtre-formu" className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                placeholder="atölye, kariyer..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </form>

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Sonuç bulunamadı."
                : `${filteredEvents.length} etkinlik gösteriliyor.`}
            </p>

            <h2>Etkinlikler</h2>
            <section id="etkinlik-listesi" className="cards-grid grid-3">
              {filteredEvents.map((event) => (
                <article key={event.id} className="kart">
                  <h3>{event.title}</h3>
                  <p><strong>Kategori:</strong> {event.category}</p>
                  <p><strong>Tarih:</strong> {event.date} {event.time}</p>
                  <button type="button" onClick={() => go("detail", event.id)}>
                    Detay
                  </button>
                </article>
              ))}
            </section>
          </section>
        )}

        {page === "detail" && (
          <section className="detay">
            {!selectedEvent ? (
              <div>
                <p>Etkinlik bulunamadı.</p>
                <button type="button" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <article className="detay-kart">
                {selectedEvent.image && (
                  <figure>
                    <img src={selectedEvent.image} alt={selectedEvent.title} />
                  </figure>
                )}
                <div className="kunye">
                  <h2>{selectedEvent.title}</h2>
                  <p><strong>Tarih:</strong> {selectedEvent.date} {selectedEvent.time}</p>
                  <p><strong>Yer:</strong> {selectedEvent.location}</p>
                  <p><strong>Kategori:</strong> {selectedEvent.category}</p>
                  <p><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
                  <p><strong>Açıklama:</strong> {selectedEvent.description}</p>
                  <button type="button" onClick={() => go("update", selectedEvent.id)}>
                    Bu etkinliği güncelle
                  </button>
                </div>
              </article>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı:</label>
              <input
                type="text"
                id="title"
                maxLength={80}
                defaultValue={page === "update" ? selectedEvent?.title : ""}
              />

              <label htmlFor="category">Kategori:</label>
              <select
                id="category"
                defaultValue={page === "update" ? selectedEvent?.category : "Seminer"}
              >
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="date">Tarih:</label>
              <input
                type="text"
                id="date"
                defaultValue={page === "update" ? selectedEvent?.date : ""}
              />

              <label htmlFor="description">Açıklama:</label>
              <textarea
                id="description"
                rows={5}
                defaultValue={page === "update" ? selectedEvent?.description : ""}
              />

              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Ad: Belinay Soyad: Azak 2416501028</p>
      </footer>
    </div>
  );
}

export default App;