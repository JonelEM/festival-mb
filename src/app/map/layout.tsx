import { Anton, Archivo, Bitter } from "next/font/google";
import "@/styles/festival.css";
import "@/styles/festival-map.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`theme-bright festival-map-page ${anton.variable} ${archivo.variable} ${bitter.variable}`}
    >
      {children}
    </div>
  );
}
