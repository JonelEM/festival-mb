import type { Metadata } from "next";
import Link from "next/link";
import { marianaSections } from "@/lib/festival-content";

export const metadata: Metadata = {
  title: "Mariana Bracetti | Festival Mariana Bracetti",
  description:
    "Conoce la historia de Mariana Bracetti, la patriota que cosió la bandera del Grito de Lares.",
};

export default function MarianaPage() {
  return (
    <>
      <header className="subpage-header dots">
        <div className="header-inner">
          <h1 className="subpage-header-title">Mariana Bracetti</h1>
          <Link href="/" className="subpage-header-back">
            Volver
          </Link>
        </div>
      </header>

      <article className="mariana-article">
        <span className="kicker">La bandera que cosió</span>
        {marianaSections.map((section) => (
          <section key={section.title} className="mariana-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
