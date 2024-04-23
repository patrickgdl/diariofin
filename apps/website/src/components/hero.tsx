import { Button } from "@diariofin/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="text-center mt-16 md:mt-18 items-center flex flex-col">
      {/* <Link href="/updates"> */}
      <Link href="/">
        <Button
          variant="outline"
          className="rounded-full border-border flex space-x-2 items-center"
        >
          <span>Anunciando acesso antecipado</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            fill="none"
          >
            <path
              fill="currentColor"
              d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
            />
          </svg>
        </Button>
      </Link>

      <h1 className="text-6xl font-medium mt-6">
        Seu negócio de maneira mais inteligente.
      </h1>

      <p className="mt-4 md:mt-6 text-[#707070] max-w-[600px]">
        Diariofin fornece uma visão melhor do seu negócio e automatiza as
        tarefas chatas, permitindo que você se concentre no que você gosta de
        fazer.
      </p>

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

          <a href={process.env.NEXT_PUBLIC_APP_URL}>
            <Button className="h-12 px-5">Acesso antecipado</Button>
          </a>
        </div>
      </div>

      <p className="text-xs text-[#707070] mt-6">
        Sem cartão de crédito necessário.
      </p>
    </section>
  );
}
