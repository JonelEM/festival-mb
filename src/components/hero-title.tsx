import { HERO_TITLE_STYLE } from "@/lib/hero-title-style";

export function HeroTitle() {
  const isOutlined = HERO_TITLE_STYLE === "outlined";

  return (
    <h1 className={isOutlined ? "title-outlined" : undefined}>
      {isOutlined ? (
        <>
          Festival
          <br />
          Mariana
          <br />
          Bracetti
        </>
      ) : (
        <>
          Mariana
          <br />
          <span className="accent" data-text="Bracetti">
            Bracetti
          </span>
        </>
      )}
    </h1>
  );
}
