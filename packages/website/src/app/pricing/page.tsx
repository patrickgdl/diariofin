import { BlurryCircle } from "@/components/blurry-circle";
import { Testimonials } from "@/components/testimonials";
import { Button } from "../../ui/components/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preços | FluxoZen",
};

export default function Page() {
  return (
    <>
      <div className="container mr-auto ml-auto max-w-[800px]">
        <div className="min-h-[950px]">
          <h1 className="mt-24 font-medium text-center text-5xl mb-2">
            Quanto custa
          </h1>

          <div className="flex items-center flex-col text-center relative">
            <h3 className="md:text-[344px] text-[244px] leading-[244px] font-medium md:leading-[344px]">
              XX
            </h3>

            <p className="font-medium text-xl mt-4">
              Solicite um plano de adoção antecipada de R$ TBD/mês
            </p>

            <span className="mt-2 text-[#878787]">
              Grátis enquanto estiver na versão beta
            </span>

            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <Link href="/talk-to-us">
                  <Button
                    variant="outline"
                    className="border border-primary h-12 px-6"
                  >
                    Fale conosco
                  </Button>
                </Link>

                <a href="https://app.fluxozen">
                  <Button className="h-12 px-5">Acesso antecipado</Button>
                </a>
              </div>
            </div>

            <BlurryCircle className="absolute -top-[50px] right-[0px] bg-[#3633D0] bg-opacity-10 dark:bg-opacity-5" />
            <BlurryCircle className="absolute bottom-[160px] left-6 bg-[#A1F5CD] bg-opacity-10 dark:bg-opacity-5" />
            <BlurryCircle className="absolute bottom-0 right-[150px] bg-[#FFECBB] bg-opacity-10 dark:bg-opacity-5" />
          </div>
        </div>
      </div>
      <Testimonials />
    </>
  );
}
