import { HeroBadgesInteractive } from "@/components/hero-badges-interactive";
import { HeroTitle } from "@/components/hero-title";

export function BrightHero() {
  return (
    <section className="hero dots">
      <div className="star-burst" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="halftoneStarBright" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2.6" fill="#F7F4ED" />
            </pattern>
            <clipPath id="starClipBright">
              <path d="M100 8 L122 72 L190 72 L135 112 L156 178 L100 138 L44 178 L65 112 L10 72 L78 72 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#starClipBright)">
            <rect width="200" height="200" fill="url(#halftoneStarBright)" />
          </g>
          <path
            d="M100 8 L122 72 L190 72 L135 112 L156 178 L100 138 L44 178 L65 112 L10 72 L78 72 Z"
            fill="none"
            stroke="#F7F4ED"
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="hero-inner">
        <span className="eyebrow">24 de septiembre · Rio Piedras, PR</span>
        <span className="festival-script">Te invitamos a celebrar</span>
        <HeroTitle />
        <div className="hero-meta">
          <HeroBadgesInteractive />
        </div>
      </div>
    </section>
  );
}
