import { FaqSection } from "@/components/faq-section";
import { withBasePath } from "@/lib/base-path";
import { introCopy, programaPanels, sponsors } from "@/lib/festival-content";

export function FestivalSections() {
  return (
    <>
      <section className="intro dots dots-cream">
        <span className="kicker">La bandera que cosió</span>
        <p>
          {introCopy}{" "}
          <strong>Un día de talleres, juegos y memoria colectiva</strong>, abierto a todo el barrio.
        </p>
      </section>

      <section className="programa" id="programa">
        <div className="section-head">
          <h2>Programa del día</h2>
          <span className="date">24 de septiembre</span>
        </div>
        <div className="grid">
          {programaPanels.map((panel) => (
            <div key={panel.title} className={`panel ${panel.tone}`}>
              <span className="tag">{panel.tag}</span>
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection />

      <section className="auspiciadores" id="auspiciadores">
        <div className="section-head">
          <h2>Auspiciadores</h2>
        </div>
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath(sponsor.src)} alt={sponsor.name} width={140} height={52} />
            </a>
          ))}
        </div>
      </section>

      <section className="apoya dots dots-red" id="apoya">
        <div className="apoya-inner">
          <span className="festival-script">Apoya el Festival</span>
          <h2>
            Cada
            <br />
            donación
            <br />
            ayuda
          </h2>
          <p>Con tu aportación, le damos vida al festival el 24 de septiembre.</p>
          <a className="btn" href="#">
            Donar ahora
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-mark">
            <span>Festival Mariana Bracetti</span>
          </div>
          <p>Organizado por La Serigráfica, Comunidad Blondet y Democracia Socialista.</p>
        </div>
      </footer>
    </>
  );
}
