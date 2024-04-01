"use client";

import { AdaptiveImage } from "@/components/adaptive-image";
import screen1Light from "public/dashboard-page-light.png";
import screen1 from "public/dashboard-page.png";
import screen2Light from "public/transactions-page-light.png";
import screen2 from "public/transactions-page.png";
import screen3Light from "public/accounts-page-light.png";
import screen3 from "public/accounts-page.png";
import screen4Light from "public/categories-page-light.png";
import screen4 from "public/categories-page.png";
import { BlurryCircle } from "./blurry-circle";
import { CardStack } from "./card-stack";

export function Screens() {
  return (
    <div className="flex items-center justify-center mt-12 md:mt-14 flex-col">
      <div className="relative">
        <BlurryCircle className="absolute -top-2 right-[320px]  hidden md:block bg-[#3633D0] dark:bg-[#3633D0]/40" />
        <BlurryCircle className="absolute -bottom-6 left-6 hidden md:block bg-[#3633D0]/50 dark:bg-[#3633D0]/20" />
        <BlurryCircle className="absolute -bottom-[60px] right-0 bg-[#3633D0]/5 dark:bg-[#3633D0]/10 -z-10 hidden md:block" />

        <CardStack
          items={[
            {
              id: 1,
              name: "Overview",
              content: (
                <AdaptiveImage
                  quality={100}
                  alt="Dashboard - Overview"
                  darkSrc={screen1}
                  lightSrc={screen1Light}
                  width={1031}
                  height={670}
                  priority
                />
              ),
            },
            {
              id: 2,
              name: "Transações",
              content: (
                <AdaptiveImage
                  quality={100}
                  alt="Dashboard - Transações"
                  darkSrc={screen2}
                  lightSrc={screen2Light}
                  width={1031}
                  height={670}
                />
              ),
            },
            {
              id: 3,
              name: "Contas",
              content: (
                <AdaptiveImage
                  quality={100}
                  alt="Dashboard - Contas"
                  darkSrc={screen3}
                  lightSrc={screen3Light}
                  width={1031}
                  height={670}
                />
              ),
            },
            {
              id: 4,
              name: "Categorias",
              content: (
                <AdaptiveImage
                  quality={100}
                  alt="Dashboard - Categorias"
                  darkSrc={screen4}
                  lightSrc={screen4Light}
                  width={1031}
                  height={670}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
