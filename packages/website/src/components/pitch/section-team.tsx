import Image from "next/image";
import Link from "next/link";
import patrick from "./patrick.png";

import { Card } from "./ui";

export function SectionTeam() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="absolute left-4 right-4 md:left-8 md:right-8 top-4 flex justify-between text-lg">
        <span>Que nós somos</span>
        <span className="text-[#878787]">
          <Link href="/">FluxoZen</Link>
        </span>
      </div>
      <div className="flex flex-col min-h-screen justify-center container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0 md:pt-0 h-[580px] md:h-auto overflow-auto pb-[100px] md:pb-0">
          <div className="space-y-8">
            <Card className="items-start space-y-0">
              <Image
                src={patrick}
                alt="Patrick"
                width={76}
                height={76}
                quality={100}
                className="mb-4"
              />

              <h2 className="text-xl">Patrick Lima</h2>
              <span>Co-founder</span>

              <p className="text-[#878787] text-sm !mt-2">
                Desenvolvedor fullstack. Trabalhou para grandes empresas como
                MadeiraMadeira, PicPay e C6Bank.
              </p>
            </Card>

            <Card className="items-start space-y-0">
              {/* <Image
                src={rodrigo}
                alt="Rodrigo"
                width={76}
                height={76}
                quality={100}
                className="mb-4"
              /> */}

              <h2 className="text-xl">Rodrigo Viana</h2>
              <span className="mb-4">Co-founder</span>

              <p className="text-[#878787] text-sm !mt-2">
                Empreendedor. Dirige sua própria empresa há X anos oferecendo
                seu serviço para uma série de outras empresas consolidadas e
                também ajudando alavancar outras em estágio inicial.
              </p>
            </Card>
          </div>
          <div>
            {/* <Image
              src={founders}
              alt="Founders"
              width={650}
              height={875}
              quality={100}
            /> */}
          </div>
          <div className="ml-auto w-full space-y-8 items-center flex">
            <h2 className="text-[64px] font-medium text-center leading-tight">
              “Frase de impacto kk”
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
