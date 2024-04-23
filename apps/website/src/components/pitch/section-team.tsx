import Image from "next/image";
import Link from "next/link";
import patrick from "./patrick.png";

import { Card } from "./ui";

export function SectionTeam() {
  return (
    <div className="min-h-screen relative w-screen overflow-auto flex flex-col">
      <div className="flex justify-between text-lg p-4">
        <span>Quem nós somos</span>
        <span className="text-[#878787]">
          <Link href="/">Diariofin</Link>
        </span>
      </div>

      <div className="flex flex-col h-[calc(100vh-60px)] justify-center container mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 px-4 md:px-0 md:pt-0 h-full md:h-auto pb-[100px] md:pb-0">
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

          <div className="w-full space-y-8 pb-[100px] md:pb-0">
            <h2 className="text-xl md:text-[60px] font-medium text-center leading-tight">
              “Expertise em tecnologia, design e administração de empresas.”
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
