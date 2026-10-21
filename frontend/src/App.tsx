import type { PageName } from "./types/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/campus-events";
import type { Category } from "./types/campus-events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";



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

    <Header title="Kampüs Etkinlikleri" />

    <Navigation current={page} onNavigate={go} />



    <main>

      {page === "home" && (

        <section id="etkinlik-listesi" className="cards-grid grid-3">

          <h2>Yaklaşan Etkinlikler</h2>

          <EventList

            events={upcomingEvents}

            onShowDetail={(id) => go("detail", id)}

          />

        </section>

      )}



      {page === "events" && (

        <section id="etkinlikler">

          <h2>Etkinlikler</h2>

          <EventFilter

            searchText={searchText}

            onSearchChange={setSearchText}

            selectedCategory={selectedCategory}

            onCategoryChange={(cat) => setSelectedCategory(cat as Category | "")}

          />

          <EventList

            events={filteredEvents}

            onShowDetail={(id) => go("detail", id)}

            emptyText="Sonuç bulunamadı."

          />

        </section>

      )}



      {page === "detail" && selectedEvent && (

        <EventDetail

          event={selectedEvent}

          onBack={() => go("events")}

          onEdit={(id) => go("update", id)}

        />

      )}



      {(page === "add" || page === "update") && (

        <section>

          <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>

          <EventForm onSubmit={() => window.scrollTo(0, 0)} />

        </section>

      )}

    </main>



    <Footer />

  </div>

);

}



export default App;