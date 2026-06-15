export function VintageHero() {
  return (
    <section className="hero dots">
      <div className="star-burst" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="halftoneStarVintage" width="11" height="11" patternUnits="userSpaceOnUse">
              <circle cx="5.5" cy="5.5" r="2.8" fill="#F2E7CE" />
            </pattern>
            <clipPath id="starClipVintage">
              <path d="M100 8 L122 72 L190 72 L135 112 L156 178 L100 138 L44 178 L65 112 L10 72 L78 72 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#starClipVintage)">
            <rect width="200" height="200" fill="url(#halftoneStarVintage)" />
          </g>
          <path
            d="M100 8 L122 72 L190 72 L135 112 L156 178 L100 138 L44 178 L65 112 L10 72 L78 72 Z"
            fill="none"
            stroke="#F2E7CE"
            strokeWidth="1.5"
            opacity="0.45"
          />
        </svg>
      </div>

      <div className="hero-inner">
        <span className="ribbon">24 de septiembre · Rio Piedras, PR</span>
        <span className="festival-script">Aprende y celebra en el Festival</span>
        <h1>
          Mariana
          <br />
          Bracetti
        </h1>
        <div className="hero-meta">
          <span className="seal">
            <span>
              Entrada
              <br />
              libre
            </span>
          </span>
          <span className="seal red">
            <span>
              Todas
              <br />
              las edades
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
