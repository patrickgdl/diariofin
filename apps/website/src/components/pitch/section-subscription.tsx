import Link from "next/link";
import { Card } from "./ui";

export function SectionSubscription() {
  return (
    <div className="min-h-screen relative w-screen overflow-auto flex flex-col">
      <div className="flex justify-between text-lg p-4">
        <span>Como faremos dinheiro</span>
        <span className="text-[#878787]">
          <Link href="/">Diariofin</Link>
        </span>
      </div>

      <div className="flex flex-col h-[calc(100vh-60px)] justify-center container mx-auto">
        <div className="px-4 md:px-0 md:pt-0 h-full md:h-auto pb-[100px] md:pb-0">
          <div className="mb-4">
            <h2 className="text-2xl">Níveis</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0 md:pt-0 md:mb-[80px] mb-12">
            <Card className="pb-8">
              <span className="py-1 px-4 bg-white text-black rounded-lg text-sm font-medium mb-4">
                Base
              </span>

              <h2 className="text-2xl">Gratuíto</h2>
              <p className="text-[#878787] text-sm text-center">
                Ofereceremos um plano gratuito limitado para os clientes
                conhecerem o sistema.
              </p>
            </Card>

            <Card className="pb-8">
              <span className="py-1 px-4 border border-border rounded-lg text-sm font-medium mb-4">
                Pro
              </span>

              <h2 className="text-2xl">TBD/mês</h2>
              <p className="text-[#878787] text-sm text-center">
                Este é o preço que os novos usuários pagarão quando lançarmos. O
                preço ainda está para ser determinado.
              </p>
            </Card>

            <Card className="pb-8">
              <span className="py-1 px-4 border border-border rounded-lg text-sm font-medium mb-4">
                Enterprise
              </span>

              <h2 className="text-2xl">TBD</h2>
              <p className="text-[#878787] text-sm text-center">
                Este plano será oferecido a empresas maiores com muitos membros.
                Este será licenciado com base e o preço ainda não foi
                determinado.
              </p>
            </Card>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl">Add ons</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0 md:pt-0 pb-[100px] md:pb-0">
            <Card className="pb-8">
              <h2>+ Membros</h2>
              <p className="text-[#878787] text-sm text-center">
                Membros adicionais de equipe terão preço por assento. A equipe
                terá a capacidade de convidar quantos usuários quiserem.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
