import Link from "next/link";

export function SectionVision() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="absolute left-8 right-8 top-4 flex justify-between text-lg">
        <span>Nossa visão</span>
        <span className="text-[#878787]">
          <Link href="/">FluxoZen</Link>
        </span>
      </div>
      <div className="flex flex-col min-h-screen justify-center container mx-auto">
        <h1 className="text-[45px] px-4 md:px-0 md:text-[122px] font-medium text-center leading-none">
          Nossa missão é ser o sistema operacional financeiro Nº 1 para
          fundadores.
        </h1>
      </div>
    </div>
  );
}
