import Image from "next/image";
import Link from "next/link";
import apps from "./apps.png";
import app from "./app.png";
import invoice from "./invoice.png";
import ai from "./fluxozen-ia.png";
import { Card } from "./ui";
import { CardContent, CardTitle } from "@/ui/components/card";

export function SectionNext() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between text-lg p-4">
          <span>O que vem a seguir</span>
          <span className="text-[#878787]">
            <Link href="/">FluxoZen</Link>
          </span>
        </div>

        <div className="flex flex-col justify-center h-[calc(100vh-60px)] items-center container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 px-4 md:px-0 md:pt-0 overflow-auto pb-[100px] md:pb-0">
            <div className="space-y-8">
              <Card>
                <CardTitle>FluxoZen AI</CardTitle>
                <CardContent>
                  <Image src={ai} width={362} alt="FluxoZen AI" quality={100} />
                </CardContent>
              </Card>

              <Card>
                <CardTitle>Apps & integrações</CardTitle>
                <CardContent>
                  <Image
                    src={apps}
                    width={362}
                    alt="Apps & integrações"
                    quality={100}
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardTitle>App Nativo</CardTitle>
              <CardContent>
                <Image src={app} width={300} alt="App" quality={100} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
