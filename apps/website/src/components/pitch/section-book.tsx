import { CalEmbed } from "@/components/cal-embed";
import { Button } from "@diariofin/ui/button";
import Link from "next/link";

export function SectionBook() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="absolute left-4 right-4 md:left-8 md:right-8 top-4 flex justify-between text-lg">
        <span>Agende uma reunião</span>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
          <Button variant="outline">Criar conta</Button>
        </Link>
      </div>
      <div className="flex flex-col min-h-screen justify-center container">
        <div className="h-[400px] md:h-[600px] px-4 md:px-0">
          <CalEmbed calLink="patrickgdl/diariofin" theme="dark" />
        </div>
      </div>
    </div>
  );
}
