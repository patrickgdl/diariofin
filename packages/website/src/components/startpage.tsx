import { Hero } from "@/components/hero";
import { Screens } from "@/components/screens";
import { SectionFour } from "@/components/section-four";
import { SectionOne } from "@/components/section-one";
import { SectionSeven } from "@/components/section-seven";
import { SectionTwo } from "@/components/section-two";
import { Testimonials } from "@/components/testimonials";

export function StartPage() {
  return (
    <>
      <Hero />
      <Screens />
      <SectionOne />
      <SectionTwo />
      <SectionFour />
      <SectionSeven />
      <Testimonials />
    </>
  );
}
