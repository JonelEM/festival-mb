"use client";

import dynamic from "next/dynamic";

const FestivalMap = dynamic(
  () => import("@/components/festival-map").then((mod) => mod.FestivalMap),
  { ssr: false },
);

export function FestivalMapLoader() {
  return <FestivalMap />;
}
