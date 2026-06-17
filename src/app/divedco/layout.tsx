import { Archivo, Bitter, Oswald } from "next/font/google";
import "@/styles/festival-divedco.css";

const archivoBlack = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "900",
});

const oswald = Oswald({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bitter = Bitter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function DivedcoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`theme-divedco ${archivoBlack.variable} ${oswald.variable} ${bitter.variable}`}
    >
      {children}
    </div>
  );
}
