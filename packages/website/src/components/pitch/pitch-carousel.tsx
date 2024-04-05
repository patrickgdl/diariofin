"use client";

import { SectionBook } from "@/components/pitch/section-book";
import { SectionDemo } from "@/components/pitch/section-demo";
import { SectionNext } from "@/components/pitch/section-next";
import { SectionProblem } from "@/components/pitch/section-problem";
import { SectionSolution } from "@/components/pitch/section-solution";
import { SectionStart } from "@/components/pitch/section-start";
import { SectionSubscription } from "@/components/pitch/section-subscription";
import { SectionTeam } from "@/components/pitch/section-team";
import { SectionVision } from "@/components/pitch/section-vision";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/components/carousel";
import { CarouselToolbar } from "./carousel-toolbar";

export function PitchCarusel() {
  return (
    <Carousel className="w-full min-h-full relative">
      <CarouselContent>
        <CarouselItem>
          <SectionStart />
        </CarouselItem>
        <CarouselItem>
          <SectionProblem />
        </CarouselItem>
        <CarouselItem>
          <SectionSolution />
        </CarouselItem>
        <CarouselItem>
          <SectionDemo />
        </CarouselItem>
        <CarouselItem>
          <SectionTeam />
        </CarouselItem>
        <CarouselItem>
          <SectionSubscription />
        </CarouselItem>
        <CarouselItem>
          <SectionVision />
        </CarouselItem>
        <CarouselItem>
          <SectionNext />
        </CarouselItem>
        <CarouselItem>
          <SectionBook />
        </CarouselItem>
      </CarouselContent>
      <CarouselToolbar />
    </Carousel>
  );
}
