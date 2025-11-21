import {
  AboutHero,
  OurStory,
  LifeCycle,
  Stats,
  Team,
  MissionValues,
} from "@/src/features/about";
import { Footer } from "@/src/features/shared";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionValues />
      <LifeCycle />
      <Stats />
      <Team />
      <Footer />
    </>
  );
}
