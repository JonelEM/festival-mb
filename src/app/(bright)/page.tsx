import { SiteHeader } from "@/components/site-header";
import { BrightHero } from "@/components/bright-hero";
import { FestivalSections } from "@/components/festival-sections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <BrightHero />
      <FestivalSections />
    </>
  );
}
