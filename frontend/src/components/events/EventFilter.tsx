import type { Category } from "../../types/campus-events";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category | "Tümü" | string;
  onCategoryChange: (category: Category | "Tümü" | string) => void;
}

const categories: { label: string; value: string }[] = [
  { label: "Tümü", value: "" },
  { label: "Yazılım", value: "Yazılım" },
  { label: "Kültür", value: "Kültür" },
  { label: "Kariyer", value: "Kariyer" },
  { label: "Spor", value: "Spor" },
  { label: "Müzik", value: "Müzik" },
  { label: "Teknoloji", value: "Teknoloji" },
];

function EventFilter({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form id="filtre-formu" className="filtre" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="arama">Etkinlik ara</label>
      <input
        type="search"
        id="arama"
        placeholder="atölye, kariyer..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label htmlFor="kategori-filtre">Kategori</label>
      <select
        id="kategori-filtre"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.label} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </form>
  );
}

export default EventFilter;