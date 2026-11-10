// Datos de ejemplo para la app de Handlebars (secciones 5 y 6).
export const site = {
  name: "Road Trip",
  tagline: "Historias de ruta",
  year: new Date().getFullYear(),
};

export const nav = [
  { id: "home", href: "/", label: "Inicio" },
  { id: "elements", href: "/elements", label: "Elementos" },
  { id: "posts", href: "/posts/atacama", label: "Posts" },
];

export const posts = [
  {
    slug: "atacama",
    title: "Atacama en cuatro días",
    date: "2026-10-30",
    image: "/images/placeholder.svg",
    summary: "Salares, geisers y noches sin luz.",
    body: [
      "Primer párrafo de ejemplo sobre el desierto más árido del mundo.",
      "Segundo párrafo de ejemplo: el viaje sigue al amanecer.",
    ],
  },
  {
    slug: "patagonia",
    title: "Patagonia sin prisa",
    date: "2026-11-05",
    image: "/images/placeholder.svg",
    summary: "Viento, hielo y kilómetros.",
    body: [
      "Primer párrafo de ejemplo sobre la ruta austral.",
      "Segundo párrafo de ejemplo: el siguiente destino.",
    ],
  },
  {
    slug: "norte",
    title: "Norte de Argentina",
    date: "2026-11-12",
    image: "/images/placeholder.svg",
    summary: "Quebradas, cerros y colores.",
    body: ["Primer párrafo de ejemplo.", "Segundo párrafo de ejemplo."],
  },
];
