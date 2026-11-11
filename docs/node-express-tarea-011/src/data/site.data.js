const siteName = process.env.SITE_NAME?.trim() || "Road Trip";
const siteYear = process.env.SITE_YEAR?.trim() || String(new Date().getFullYear());

export const site = {
  name: siteName,
  brandSuffix: "by TEMPLATED",
  year: siteYear,
  description: "Un blog de viajes renderizado en el servidor con Express y Handlebars.",
};

export const nav = [
  { label: "Home", href: "/", key: "home" },
  { label: "Elements", href: "/elements", key: "elements" },
];

export const posts = [
  {
    slug: "atacama",
    title: "Atacama en cuatro días",
    date: "2026-10-30",
    image: "banner2.jpg",
    summary: "Salares, geisers y noches sin luz.",
    body: [
      "El desierto de Atacama se recorre despacio: distancias largas, altura y un silencio que se corta con el viento. La primera parada es San Pedro, con sus calles de tierra y sus terrazas mirando al licancabur.",
      "Al segundo día toca madrugar para ver los geisers del Tatio antes de que el sol caliente el valle. Después, el salar de Atacama y una tarde de flamencos, lagunas y horizontes blancos.",
      "La última noche conviene reservarla para mirar el cielo: sin luz artificial cerca, la Vía Láctea aparece completa y el frío se olvida por un rato.",
    ],
  },
  {
    slug: "patagonia",
    title: "Patagonia sin prisa",
    date: "2026-09-12",
    image: "banner5.jpg",
    summary: "Glaciares, viento y rutas de ripio.",
    body: [
      "La Patagonia no se deja apurar. El viento decide el ritmo y las rutas de ripio piden paciencia. Entre El Calafate y El Chaltén hay miradores que justifican cada frenada.",
      "El glaciar Perito Moreno se ve primero desde las pasarelas y después desde el agua. El estruendo de los desprendimientos llega unos segundos tarde, como si el paisaje tuviera su propio eco.",
      "Para cerrar el viaje, una caminata corta hasta una laguna glaciaria: el agua turquesa y el bosque nativo son la mejor despedida.",
    ],
  },
  {
    slug: "salta",
    title: "Salta, de puna en puna",
    date: "2026-08-05",
    image: "banner4.jpg",
    summary: "Quebradas, cardones y cerros de colores.",
    body: [
      "La ruta de la quebrada de Humahuaca se arma con pueblos pequeños, mercados de altura y cerros de siete colores. Cada parada tiene una excusa para bajarse del auto.",
      "En la puna, el cielo parece más alto y el aire más liviano. A media tarde, el sol pinta las laderas y las sombras alargan el paisaje hasta el horizonte.",
      "Al volver a Salta, un café en la plaza y una empanada salteña cierran el día. El viaje se mide menos en kilómetros que en conversaciones.",
    ],
  },
  {
    slug: "mendoza",
    title: "Mendoza entre viñedos",
    date: "2026-07-18",
    image: "banner3.jpg",
    summary: "Ruta del vino y noches de montaña.",
    body: [
      "Mendoza combina bodegas y montaña en pocos kilómetros. La ruta del vino arranca en Luján de Cuyo y sigue entre olivares, viñedos y caminos de tierra.",
      "Cada bodega cuenta una historia distinta: una construida con adobe, otra con tanques de acero y una tercera que envejece sus vinos a la sombra de los álamos.",
      "Cuando cae la tarde, la precordillera se tiñe de rosa. La última copa sabe a altura, a sol de invierno y a ganas de volver.",
    ],
  },
];
