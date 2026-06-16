import { SiteHeader } from "@/components/site-header";
import { VintageHero } from "@/components/vintage-hero";
import { FestivalSections } from "@/components/festival-sections";

export default function VintagePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <VintageHero />
        <FestivalSections />
      </main>
    </>
  );
}
