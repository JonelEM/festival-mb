import { HERO_BADGE_STYLE } from "@/lib/hero-badge-style";

export function HeroBadges() {
  if (HERO_BADGE_STYLE === "stamp") {
    return (
      <>
        <span className="stamp">Entrada libre</span>
        <span className="stamp red">Todas las edades</span>
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
