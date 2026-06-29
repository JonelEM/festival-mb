export const programaPanels = [
  {
    tone: "blue",
    tag: "Música",
    title: "Música en vivo",
    description: "Artistas locales en escena durante todo el festival.",
  },
  {
    tone: "blue",
    tag: "Comida",
    title: "Comida",
    description: "Sabores del barrio y cocina comunitaria para compartir en familia.",
  },
  {
    tone: "red",
    tag: "Artesanías",
    title: "Artesanías",
    description: "Trabajo manual y creaciones de artesanes y artesanas locales.",
  },
  {
    tone: "red",
    tag: "Diálogo",
    title: "Discusiones comunitarias",
    description: "Conversaciones abiertas sobre el barrio, su historia y su futuro.",
  },
] as const;

export const sponsors = [
  { name: "Bacardi", href: "https://www.bacardi.com", src: "/logos/bacardi.svg" },
  { name: "Goya", href: "https://www.goya.com", src: "/logos/goya.svg" },
  { name: "Claro", href: "https://www.claro.com.pr", src: "/logos/claro.svg" },
  { name: "Liberty", href: "https://www.libertypr.com", src: "/logos/liberty.svg" },
  { name: "Banco Popular", href: "https://www.popular.com", src: "/logos/banco-popular.svg" },
  { name: "Coca-Cola", href: "https://www.cocacola.com", src: "/logos/coca-cola.svg" },
] as const;

export const introCopy =
  "En 1868, Mariana Bracetti cosió la bandera revolucionaria de Lares: una cruz blanca sobre azul y rojo, con una estrella solitaria. Hoy, ese mismo gesto — coser comunidad, hilo a hilo — es lo que el festival celebra.";

export const marianaSections = [
  {
    title: "Quién fue Mariana Bracetti",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    title: "La bandera que cosió",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
      "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    ],
  },
  {
    title: "Por qué la recordamos hoy",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.",
      "In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.",
    ],
  },
] as const;

export const faqItems = [
  {
    question: "¿Cuándo y dónde es el festival?",
    answer:
      "El Festival Mariana Bracetti se celebra el 24 de septiembre en Río Piedras, Puerto Rico.",
  },
  {
    question: "¿Cómo llego al festival?",
    answer:
      "El festival tomará lugar en la comunidad Blondet, en las calles Balseiro y Añasco, desde El Refugio hasta Malayo Bar. Recomendamos llegar por el tren urbano en la parada Universidad.",
  },
  {
    question: "¿La entrada tiene costo?",
    answer:
      "No, la entrada es completamente libre y todas las actividades están abiertas para todas las edades. Habrá vendedores de comida y artistas vendiendo sus creaciones, así que te recomendamos traer efectivo para apoyarlos.",
  },
  {
    question: "¿Qué actividades habrá?",
    answer:
      "Habrá música en vivo, comida, artesanías y discusiones comunitarias durante todo el día. Consulta la sección Programa para más detalles.",
  },
  {
    question: "¿Puedo llevar a mi familia y niñes?",
    answer:
      "¡Claro! El festival está pensado para disfrutarse en familia, con actividades para todas las edades.",
  },
  {
    question: "¿Cómo puedo apoyar o ser voluntario?",
    answer:
      'Puedes apoyar con una donación a través de la sección "Apoya el Festival" más abajo, o escribiendo a los organizadores si quieres ser parte del equipo de voluntaries.',
  },
] as const;
