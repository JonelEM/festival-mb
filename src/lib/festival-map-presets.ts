export const MARKER_PRESETS = {
  bar: {
    icon: "🍺",
    color: "#29ABE2",
    legendLabel: "Bares",
  },
  restaurant: {
    icon: "🍽️",
    color: "#ED1C24",
    legendLabel: "Restaurantes",
  },
  foodStall: {
    icon: "🌮",
    color: "#F9C4C6",
    legendLabel: "Kioskos de comida",
  },
  artist: {
    icon: "🎨",
    color: "#29ABE2",
    legendLabel: "Artistas",
  },
  jewelry: {
    icon: "💍",
    color: "#BFE4F7",
    legendLabel: "Joyería",
  },
  clothes: {
    icon: "👕",
    color: "#29ABE2",
    legendLabel: "Ropa",
  },
  musicStage: {
    icon: "🎸",
    color: "#ED1C24",
    legendLabel: "Escenarios",
  },
  trainStation: {
    icon: "🚆",
    color: "#1A1A1A",
    legendLabel: "Estación de tren",
  },
  parking: {
    icon: "🅿️",
    color: "#F7F4ED",
    border: "#1A1A1A",
    legendLabel: "Estacionamiento",
  },
} as const;

export type MarkerPreset = keyof typeof MARKER_PRESETS;

export const LEGEND_PRESETS: MarkerPreset[] = [
  "bar",
  "restaurant",
  "foodStall",
  "artist",
  "jewelry",
  "clothes",
  "musicStage",
  "trainStation",
  "parking",
];
