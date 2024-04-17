"use client";

import Link from "next/link";

export function SectionDemo() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="absolute left-4 right-4 md:left-8 md:right-8 top-4 flex justify-between text-lg">
        <span>Version 0.1 (Private beta)</span>
        <span className="text-[#878787]">
          <Link href="/">Fluxozen</Link>
        </span>
      </div>
      <div className="flex flex-col min-h-screen justify-center container mx-auto">
        <h1 className="text-[45px] px-4 md:px-0 font-medium text-center leading-none">
          Mostrar aplicação (DEMO)
        </h1>
      </div>
    </div>
  );
}
