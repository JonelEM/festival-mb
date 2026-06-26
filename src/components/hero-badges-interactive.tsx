"use client";

import Link from "next/link";
import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { addFestivalToCalendar } from "@/lib/add-to-calendar";
import { withBasePath } from "@/lib/base-path";
import { HERO_BADGE_STYLE } from "@/lib/hero-badge-style";

type BadgeTilt = CSSProperties & { "--badge-tilt": string };

function useBadgeShake() {
  const ref = useRef<HTMLElement>(null);

  const shake = useCallback(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    element.classList.remove("is-shaking");
    void element.offsetWidth;
    element.classList.add("is-shaking");

    const onAnimationEnd = () => {
      element.classList.remove("is-shaking");
      element.removeEventListener("animationend", onAnimationEnd);
    };

    element.addEventListener("animationend", onAnimationEnd);
  }, []);

  return { ref, shake };
}

function HeroBadgeButton({
  className,
  tilt,
  onActivate,
  children,
}: {
  className: string;
  tilt: string;
  onActivate: () => void;
  children: ReactNode;
}) {
  const { ref, shake } = useBadgeShake();

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={`${className} hero-badge-btn`}
      style={{ "--badge-tilt": tilt } as BadgeTilt}
      onClick={() => {
        shake();
        onActivate();
      }}
    >
      {children}
    </button>
  );
}

function HeroBadgeLink({
  className,
  tilt,
  href,
  children,
}: {
  className: string;
  tilt: string;
  href: string;
  children: ReactNode;
}) {
  const { ref, shake } = useBadgeShake();

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={`${className} hero-badge-btn`}
      style={{ "--badge-tilt": tilt } as BadgeTilt}
      onClick={shake}
    >
      {children}
    </Link>
  );
}

export function HeroBadgesInteractive() {
  const mapHref = withBasePath("/map");

  if (HERO_BADGE_STYLE === "stamp") {
    return (
      <>
        <HeroBadgeLink className="stamp" tilt="2deg" href={mapHref}>
          Ver mapa
        </HeroBadgeLink>
        <HeroBadgeButton
          className="stamp red"
          tilt="-2deg"
          onActivate={addFestivalToCalendar}
        >
          Al calendario
        </HeroBadgeButton>
      </>
    );
  }

  return (
    <>
      <HeroBadgeLink className="seal" tilt="-9deg" href={mapHref}>
        <span>
          Ver
          <br />
          mapa
        </span>
      </HeroBadgeLink>
      <HeroBadgeButton
        className="seal red"
        tilt="8deg"
        onActivate={addFestivalToCalendar}
      >
        <span>
          Al
          <br />
          calendario
        </span>
      </HeroBadgeButton>
    </>
  );
}
