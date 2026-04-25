import type { Metadata } from "next";
import {
  AboutHero,
  OurStory,
  LifeCycle,
  Stats,
  Team,
  MissionValues,
} from "@/src/features/about";
import { Footer } from "@/src/features/shared";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hatch Haven Acres — a sustainable poultry farm in Nanyuki, Kenya, raising free-range chickens, turkeys, ducks, and more since 2010.",
  openGraph: {
    title: "About Hatch Haven Acres",
    description:
      "Our story, mission, and values. Ethical, sustainable poultry farming in Nanyuki, Kenya.",
    url: "https://www.hatchhavenacres.com/about",
  },
};

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
