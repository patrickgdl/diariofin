"use client";

import { useCarousel } from "@fluxozen/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@fluxozen/ui/tooltip";
import { cn } from "@fluxozen/ui/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { MdEditCalendar, MdChevronLeft, MdChevronRight } from "react-icons/md";

export function CarouselToolbar() {
  const api = useCarousel();

  useHotkeys("arrowRight", () => api.scrollNext(), [api]);
  useHotkeys("arrowLeft", () => api.scrollPrev(), [api]);

  return (
    <div className="fixed flex justify-center left-0 bottom-5 w-full">
      <AnimatePresence>
        <motion.div animate={{ y: 0 }} initial={{ y: 100 }}>
          <TooltipProvider delayDuration={20}>
            <div className="flex backdrop-filter backdrop-blur-lg dark:bg-[#1A1A1A]/80 h-10 px-4 py-2 border border-[#2C2C2C] items-center rounded-2xl space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" onClick={() => api.scrollTo(100)}>
                    <MdEditCalendar size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-3 rounded-sm"
                  sideOffset={25}
                >
                  <span className="text-xs">Agende uma reunião conosco</span>
                </TooltipContent>
              </Tooltip>
              <div className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      disabled={!api?.canScrollPrev}
                      className={cn(!api?.canScrollPrev && "opacity-50")}
                      onClick={() => {
                        api.scrollPrev();
                      }}
                    >
                      <MdChevronLeft className="h-6 w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    className="py-1 px-3 rounded-sm"
                    sideOffset={25}
                  >
                    <span className="text-xs">Slide anterior</span>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      disabled={!api?.canScrollNext}
                      className={cn(!api?.canScrollNext && "opacity-50")}
                      onClick={() => {
                        api.scrollNext();
                      }}
                    >
                      <MdChevronRight className="h-6 w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    className="py-1 px-3 rounded-sm"
                    sideOffset={25}
                  >
                    <span className="text-xs">Próximo slide</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
