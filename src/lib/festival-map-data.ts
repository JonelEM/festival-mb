import type { Feature, FeatureCollection, LineString, Polygon } from "geojson";
import festivalRouteData from "@/data/festival-route.json";
import {
  LEGEND_PRESETS,
  MARKER_PRESETS,
  type MarkerPreset,
} from "@/lib/festival-map-presets";

type Coord = [number, number];

function dmsToCoord(
  latDeg: number,
  latMin: number,
  latSec: number,
  lngDeg: number,
  lngMin: number,
  lngSec: number,
): Coord {
  const lat = latDeg + latMin / 60 + latSec / 3600;
  const lng = lngDeg + lngMin / 60 + lngSec / 3600;
  return [-lng, lat];
}

export const MAP_LOCATIONS = {
  elRefugio: [-66.053612, 18.4049632] as Coord,
  malayoBar: [-66.053654, 18.4034763] as Coord,
  dipea: [-66.0535431, 18.4030853] as Coord,
  musicStage1: [-66.05386067504399, 18.404909392339725] as Coord,
  musicStage2: [-66.05388026041871, 18.4035757783006] as Coord,
  trainStation: [-66.05171, 18.4058] as Coord,
  parking: dmsToCoord(18, 24, 21.8, 66, 3, 3.4),
};

const routeCollection = festivalRouteData as FeatureCollection<LineString>;
const routeFeature = routeCollection.features[0];

/** Ruta trazada en Google Earth — editar `src/data/festival-route.json` o `festival-path.kml` */
export const FESTIVAL_ROUTE = routeFeature;
export const FESTIVAL_ROUTE_COORDS = routeFeature.geometry.coordinates as Coord[];

function routeMidpoint(coords: Coord[]): Coord {
  const [lng, lat] = coords.reduce(
    (acc, [cLng, cLat]) => [acc[0] + cLng, acc[1] + cLat],
    [0, 0],
  );
  return [lng / coords.length, lat / coords.length];
}

export const FESTIVAL_CENTER: Coord = routeMidpoint(FESTIVAL_ROUTE_COORDS);

export type FestivalMarker = {
  id: string;
  coords: Coord;
  preset: MarkerPreset;
  label: string;
  title: string;
  desc: string;
};

export const FESTIVAL_MARKERS: FestivalMarker[] = [
  {
    id: "el-refugio",
    coords: MAP_LOCATIONS.elRefugio,
    preset: "bar",
    label: "El Refugio",
    title: "El Refugio",
    desc: "Bar en la calle Balseiro — inicio del recorrido del festival.",
  },
  {
    id: "malayo-bar",
    coords: MAP_LOCATIONS.malayoBar,
    preset: "bar",
    label: "Malayo Bar",
    title: "Malayo Bar",
    desc: "Bar de referencia en el corazón del recinto.",
  },
  {
    id: "dipea",
    coords: MAP_LOCATIONS.dipea,
    preset: "restaurant",
    label: "Dipea",
    title: "Dipea Wings",
    desc: "Restaurante en la calle Añasco.",
  },
  {
    id: "music-stage-1",
    coords: MAP_LOCATIONS.musicStage1,
    preset: "musicStage",
    label: "Escenario 1",
    title: "Escenario Principal",
    desc: "Presentaciones en vivo y música principal del festival.",
  },
  {
    id: "music-stage-2",
    coords: MAP_LOCATIONS.musicStage2,
    preset: "musicStage",
    label: "Escenario 2",
    title: "Escenario 2",
    desc: "Segundo escenario con sets acústicos y DJ.",
  },
  {
    id: "train-universidad",
    coords: MAP_LOCATIONS.trainStation,
    preset: "trainStation",
    label: "Tren",
    title: "Estación Universidad",
    desc: "Parada del tren urbano — recomendamos llegar por aquí.",
  },
  {
    id: "parking",
    coords: MAP_LOCATIONS.parking,
    preset: "parking",
    label: "Parking",
    title: "Estacionamiento",
    desc: "Área de estacionamiento cercana al festival.",
  },
];

export const LEGEND_ITEMS = LEGEND_PRESETS.map((preset) => ({
  preset,
  label: MARKER_PRESETS[preset].legendLabel,
  color: MARKER_PRESETS[preset].color,
  border: "border" in MARKER_PRESETS[preset]
    ? MARKER_PRESETS[preset].border
    : undefined,
}));

/** ~8 m a cada lado del eje de la calle */
const ROUTE_HALF_WIDTH = 0.000075;

function unitPerp(
  dlng: number,
  dlat: number,
  side: "left" | "right",
): [number, number] {
  const len = Math.hypot(dlng, dlat);
  if (len === 0) {
    return [0, 0];
  }

  const sign = side === "left" ? 1 : -1;
  return [sign * (-dlat / len), sign * (dlng / len)];
}

function bisectorOffset(
  curr: Coord,
  n1x: number,
  n1y: number,
  n2x: number,
  n2y: number,
  halfWidth: number,
): Coord {
  let bx = n1x + n2x;
  let by = n1y + n2y;
  const blen = Math.hypot(bx, by);

  if (blen < 1e-12) {
    return [curr[0] + n1x * halfWidth, curr[1] + n1y * halfWidth];
  }

  bx /= blen;
  by /= blen;
  return [curr[0] + bx * halfWidth, curr[1] + by * halfWidth];
}

function offsetSide(
  line: Coord[],
  side: "left" | "right",
  halfWidth: number,
): Coord[] {
  const result: Coord[] = [];

  for (let i = 0; i < line.length; i++) {
    const curr = line[i];

    if (i === 0) {
      const [nx, ny] = unitPerp(
        line[1][0] - curr[0],
        line[1][1] - curr[1],
        side,
      );
      result.push([curr[0] + nx * halfWidth, curr[1] + ny * halfWidth]);
      continue;
    }

    if (i === line.length - 1) {
      const [nx, ny] = unitPerp(
        curr[0] - line[i - 1][0],
        curr[1] - line[i - 1][1],
        side,
      );
      result.push([curr[0] + nx * halfWidth, curr[1] + ny * halfWidth]);
      continue;
    }

    const prev = line[i - 1];
    const next = line[i + 1];
    const [n1x, n1y] = unitPerp(curr[0] - prev[0], curr[1] - prev[1], side);
    const [n2x, n2y] = unitPerp(next[0] - curr[0], next[1] - curr[1], side);
    result.push(bisectorOffset(curr, n1x, n1y, n2x, n2y, halfWidth));
  }

  return result;
}

function bufferPolyline(line: Coord[]): Coord[] {
  const left = offsetSide(line, "left", ROUTE_HALF_WIDTH);
  const right = offsetSide(line, "right", ROUTE_HALF_WIDTH);
  return [...left, ...right.reverse(), left[0]];
}

/** Corredor generado a partir de la ruta de Google Earth */
export const FESTIVAL_ZONE: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [bufferPolyline(FESTIVAL_ROUTE_COORDS)],
      },
      properties: { name: "Recinto del festival" },
    },
  ],
};
