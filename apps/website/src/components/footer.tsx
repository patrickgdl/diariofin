"use client";

import { LogoLarge } from "@/components/logo-large";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialLinks } from "./social-links";

export function Footer() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <footer className="border-t-[1px] border-border px-4 md:px-0 pt-10 md:pt-16 bg-[#F6F6F3] dark:bg-[#0C0C0C]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          <Link href="/" className="scale-50 -ml-[52px] md:ml-0 md:scale-100">
            <LogoLarge />
            <span className="sr-only">Fluxozen</span>
          </Link>

          <span className="font-normal md:text-2xl text-right">
            Seu negócio de maneira mais inteligente.
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full mb-10 md:mb-20">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium">Produto</span>
              <ul>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/">Funcionalidades</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/pricing">Preços</Link>
                </li>
                {/* <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/updates">Atualizações</Link>
                </li> */}
              </ul>
            </div>

            <div>
              <span>Recursos</span>
              <ul>
                {/* <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/support">Suporte</Link>
                </li> */}
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/policy">Política de Privacidade</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/terms">Termos e Condições</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/pitch">Investidores</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex justify-between md:items-end flex-col space-y-14">
              <div className="flex items-center">
                <SocialLinks />
              </div>
              {/* <div className="md:mr-0 mr-auto">
                <StatusWidget />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
