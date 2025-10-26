import {
  AboutHero,
  OurStory,
  LifeCycle,
  Stats,
  Team,
} from "@/src/features/about";
import { Footer } from "@/src/features/shared";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <LifeCycle />
      <OurStory />
      <Stats />
      <Team />
      <Footer />
    </>
  );
}
