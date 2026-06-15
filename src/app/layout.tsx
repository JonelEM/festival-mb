import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Festival Mariana Bracetti",
  description:
    "Un día de talleres, juegos y memoria colectiva en Río Piedras, Puerto Rico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
