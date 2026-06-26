import type { Metadata } from "next";
import Link from "next/link";
import { FestivalMapLoader } from "@/components/festival-map-loader";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Mapa del Festival | Festival Mariana Bracetti",
  description:
    "Mapa interactivo en 3D del festival en Río Piedras — escenarios, comida, artesanías y más.",
};

export default function MapPage() {
  return (
    <>
      <header className="map-header dots">
        <div className="header-inner">
          <h1 className="map-header-title">Mapa del Festival</h1>
          <Link href={withBasePath("/")} className="map-header-back">
            Cerrar Mapa
          </Link>
        </div>
      </header>

      <FestivalMapLoader />
    </>
  );
}
