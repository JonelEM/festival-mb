"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FESTIVAL_CENTER,
  FESTIVAL_MARKERS,
  FESTIVAL_ZONE,
  MAP_LOCATIONS,
  LEGEND_ITEMS,
  type FestivalMarker,
} from "@/lib/festival-map-data";
import { MARKER_PRESETS } from "@/lib/festival-map-presets";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const HAS_VALID_TOKEN = MAPBOX_TOKEN.startsWith("pk.");

function makeMarkerEl(marker: FestivalMarker) {
  const preset = MARKER_PRESETS[marker.preset];
  const borderStyle =
    "border" in preset && preset.border
      ? ` border-color:${preset.border};`
      : "";

  const el = document.createElement("div");
  el.className = "festival-marker";
  el.innerHTML = `
    <div class="marker-bubble marker-bubble--${marker.preset}" style="background:${preset.color};${borderStyle}">
      <span>${preset.icon}</span>
    </div>
    <div class="marker-label">${marker.label}</div>
  `;
  return el;
}

export function FestivalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const rotationFrameRef = useRef<number | null>(null);
  const rotatingRef = useRef(true);

  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState(!HAS_VALID_TOKEN);
  const [legendOpen, setLegendOpen] = useState(false);
  const legendMenuRef = useRef<HTMLDivElement>(null);

  const stopRotation = useCallback(() => {
    rotatingRef.current = false;
    if (rotationFrameRef.current !== null) {
      cancelAnimationFrame(rotationFrameRef.current);
      rotationFrameRef.current = null;
    }
  }, []);

  const flyToMusicStage = useCallback(() => {
    mapRef.current?.flyTo({
      center: MAP_LOCATIONS.musicStage1,
      zoom: 18,
      pitch: 60,
      bearing: 15,
      duration: 1800,
      essential: true,
    });
  }, []);

  const flyToTrain = useCallback(() => {
    mapRef.current?.flyTo({
      center: MAP_LOCATIONS.trainStation,
      zoom: 17.5,
      pitch: 55,
      bearing: 15,
      duration: 1800,
      essential: true,
    });
  }, []);

  const resetView = useCallback(() => {
    mapRef.current?.flyTo({
      center: FESTIVAL_CENTER,
      zoom: 17.2,
      pitch: 55,
      bearing: 15,
      duration: 1800,
      essential: true,
    });
  }, []);

  useEffect(() => {
    if (!HAS_VALID_TOKEN || !mapContainerRef.current || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;
    setLoading(true);
    setConfigError(false);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: FESTIVAL_CENTER,
      zoom: 17.2,
      pitch: 55,
      bearing: 15,
      antialias: true,
    });

    mapRef.current = map;

    const onLoad = () => {
      setLoading(false);

      const layers = map.getStyle().layers;
      let labelLayerId: string | undefined;
      for (const layer of layers ?? []) {
        if (layer.type === "symbol" && layer.layout?.["text-field"]) {
          labelLayerId = layer.id;
          break;
        }
      }

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "height"],
              0,
              "#f7f4ed",
              20,
              "#bfe4f7",
              50,
              "#29abe2",
              100,
              "#1a1a1a",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.88,
          },
        },
        labelLayerId,
      );

      map.addSource("festival-zone", {
        type: "geojson",
        data: FESTIVAL_ZONE,
      });

      map.addLayer({
        id: "festival-fill",
        type: "fill",
        source: "festival-zone",
        paint: {
          "fill-color": "#bfe4f7",
          "fill-opacity": 0.55,
        },
      });

      map.addLayer({
        id: "festival-border-casing",
        type: "line",
        source: "festival-zone",
        paint: {
          "line-color": "#1a1a1a",
          "line-width": 5,
        },
      });

      map.addLayer({
        id: "festival-border",
        type: "line",
        source: "festival-zone",
        paint: {
          "line-color": "#ed1c24",
          "line-width": 2.5,
        },
      });

      for (const marker of FESTIVAL_MARKERS) {
        const el = makeMarkerEl(marker);
        const preset = MARKER_PRESETS[marker.preset];
        const popup = new mapboxgl.Popup({
          offset: [0, -42],
          closeButton: true,
          maxWidth: "240px",
        }).setHTML(`
          <span class="popup-icon">${preset.icon}</span>
          <div class="popup-title">${marker.title}</div>
          <div class="popup-desc">${marker.desc}</div>
        `);

        new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(marker.coords)
          .setPopup(popup)
          .addTo(map);
      }

      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.addControl(new mapboxgl.ScaleControl({ unit: "metric" }), "bottom-right");

      rotatingRef.current = true;
      const rotate = () => {
        if (!rotatingRef.current) return;
        map.setBearing(map.getBearing() + 0.06);
        rotationFrameRef.current = requestAnimationFrame(rotate);
      };
      rotate();
      map.resize();
    };

    const onResize = () => map.resize();

    const onError = (event: mapboxgl.ErrorEvent) => {
      const error = event.error as { status?: number } | undefined;
      if (error?.status === 401) {
        setConfigError(true);
        setLoading(false);
      }
    };

    const onMouseDown = () => stopRotation();
    const onTouchStart = () => stopRotation();

    const resizeObserver = new ResizeObserver(onResize);

    map.on("load", onLoad);
    map.on("error", onError);
    map.on("mousedown", onMouseDown);
    map.on("touchstart", onTouchStart);
    window.addEventListener("resize", onResize);
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      stopRotation();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      map.off("load", onLoad);
      map.off("error", onError);
      map.off("mousedown", onMouseDown);
      map.off("touchstart", onTouchStart);
      map.remove();
      mapRef.current = null;
    };
  }, [stopRotation]);

  useEffect(() => {
    if (!legendOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (
        legendMenuRef.current &&
        !legendMenuRef.current.contains(event.target as Node)
      ) {
        setLegendOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLegendOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [legendOpen]);

  return (
    <div className="map-shell">
      <div
        className={`map-loading${loading ? "" : " hidden"}`}
        aria-hidden={!loading}
      >
        <div className="spinner" />
        <p>Cargando mapa 3D…</p>
      </div>

      {configError ? (
        <div className="map-config-notice">
          <div className="map-config-notice-panel">
            <div style={{ fontSize: "48px" }}>🗺️</div>
            <h2>Mapa no disponible</h2>
            <p>
              Configura <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> en{" "}
              <code>.env.local</code> con un token público de Mapbox.
            </p>
          </div>
        </div>
      ) : null}

      <div ref={mapContainerRef} className="map-container" />

      {!configError ? (
        <>
          <div className="map-controls">
            <button type="button" className="ctrl-btn" onClick={flyToMusicStage}>
              🎸 Escenarios
            </button>
            <button type="button" className="ctrl-btn" onClick={flyToTrain}>
              🚆 Estación Universidad
            </button>
            <button type="button" className="ctrl-btn" onClick={resetView}>
              🗺️ Vista completa
            </button>
          </div>

          <div className="map-legend-menu" ref={legendMenuRef}>
            <button
              type="button"
              className="legend-toggle"
              aria-expanded={legendOpen}
              aria-haspopup="dialog"
              aria-controls="map-legend-panel"
              onClick={() => setLegendOpen((open) => !open)}
            >
              <span className="legend-toggle-icon" aria-hidden="true">
                🗺️
              </span>
              Leyenda
            </button>

            {legendOpen ? (
              <div
                id="map-legend-panel"
                className="legend-panel"
                role="dialog"
                aria-label="Leyenda del mapa"
              >
                {LEGEND_ITEMS.map((item) => (
                  <div key={item.preset} className="legend-item">
                    <span className="legend-icon" aria-hidden="true">
                      {MARKER_PRESETS[item.preset].icon}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
