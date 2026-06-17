import { introCopy } from "@/lib/festival-content";

export function DivedcoIntro() {
  return (
    <section className="intro-band">
      <div className="inner">
        <span className="kicker">La bandera que cosió</span>
        <p>
          {introCopy}{" "}
          <strong>Un día de talleres, juegos y memoria colectiva</strong>, abierto a todo el barrio.
        </p>
      </div>
    </section>
  );
}
