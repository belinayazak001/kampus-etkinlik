import type { CampusEvent } from "../types/campus-events";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 150,
    date: "12 Ekim 2026",
    time: "14:00",
    location: "A Blok",
    description: "Sektör liderleri ile buluşma ve kariyer fırsatları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "20 Ekim 2026",
    time: "10:00",
    location: "Lab 2",
    description: "Arduino ile çizgi izleyen robot yapımı.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik",
    category: "Söyleşi",
    capacity: 50,
    date: "27 Ekim 2026",
    time: "15:00",
    location: "B Blok",
    description: "Ağ güvenliği ve sızma testleri üzerine söyleşi.",
    image: "/afis.svg"
  }
];