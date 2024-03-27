"use client";

import { AdaptiveImage } from "@/components/adaptive-image";
import { motion } from "framer-motion";
import exportingLight from "public/exporting-light.png";
import exporting from "public/exporting.png";
import invoicingLight from "public/invoicing-light.png";
import invoicing from "public/invoicing.png";
import { useState } from "react";

export function SectionFour() {
  const [isActive, setActive] = useState(false);
  const [isActive2, setActive2] = useState(false);

  return (
    <section className="flex justify-between space-y-12 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12">
      <div
        className="border border-border basis-1/3 rounded-2xl bg-white dark:bg-[#121212] p-10 md:text-center flex flex-col"
        onMouseEnter={() => setActive2(true)}
        onMouseLeave={() => setActive2(false)}
      >
        <span className="text-primary border border-primary rounded-full self-start font-semibold px-3 text-xs py-1.5 mb-4">
          Em breve
        </span>
        <h4 className="font-medium text-xl md:text-2xl mb-4">
          Invoice e Faturas
        </h4>
        <p className="text-[#878787]">
          Estamos trabalhando duro para oferecer a você a melhor solução de
          invoice e faturas. Iremos apresentar faturas baseadas na web,
          colaboração ao vivo e sincronização de projetos.
        </p>
        <motion.div
          animate={isActive2 ? { y: -5 } : { y: 0 }}
          initial={{ y: -5 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mt-8 md:mt-auto"
        >
          <AdaptiveImage
            darkSrc={invoicing}
            lightSrc={invoicingLight}
            quality={100}
            className="object-contain"
            alt="Invoice"
          />
        </motion.div>
      </div>

      <div
        className="border border-border md:basis-2/3 rounded-2xl bg-white dark:bg-[#121212] p-10 flex justify-between md:space-x-8 md:flex-row flex-col"
        onMouseEnter={() => setActive2(true)}
        onMouseLeave={() => setActive2(false)}
      >
        <h4 className="font-medium text-xl md:text-2xl mb-4">
          Seamless export
        </h4>
        <p className="text-[#878787]">
          Take the hassle out of preparing exports for your accountant. Just
          select any time period or transaction you want and hit export. We
          package everything up neatly in a CSV file (accountants loves these)
          clearly pointing to the right attachment.
        </p>

        <motion.div
          animate={isActive2 ? { y: -5, x: -5 } : { y: 0, x: 0 }}
          initial={{ y: -5, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mt-8 lg:mt-auto"
        >
          <AdaptiveImage
            darkSrc={exporting}
            lightSrc={exportingLight}
            quality={100}
            alt="Export"
          />
        </motion.div>
      </div>
    </section>
  );
}
