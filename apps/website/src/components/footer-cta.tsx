"use client";

import { Button } from "@fluxozen/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border rounded-2xl md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-[#121212]">
      <span className="text-6xl	md:text-8xl font-medium text-white">
        Livre de estresse
      </span>
      <p className="text-[#878787] mt-6">
        Fluxozen fornece uma visão melhor do seu negócio e
        <br />
        automatiza as tarefas chatas, permitindo que você se concentre no que
        você gosta de fazer.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/talk-to-us">
            <Button
              variant="outline"
              className="border border-primary h-12 px-6 hidden md:block"
            >
              Fale conosco
            </Button>
          </Link>

          <a href={process.env.NEXT_PUBLIC_APP_URL}>
            <Button className="h-12 px-5">Acesso antecipado</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
