import { SiteHeader } from "@/components/site-header";
import { DivedcoFestivalSections } from "@/components/divedco-festival-sections";
import { DivedcoHero } from "@/components/divedco-hero";
import { DivedcoIntro } from "@/components/divedco-intro";

export default function DivedcoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <DivedcoHero />
        <DivedcoIntro />
        <DivedcoFestivalSections />
      </main>
    </>
  );
}
