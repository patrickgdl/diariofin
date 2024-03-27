import { CalEmbed } from "@/components/cal-embed";
import { Button } from "../../ui/components/button";
import Link from "next/link";

export function SectionBook() {
  return (
    <div className="min-h-screen relative w-screen">
      <div className="absolute left-4 right-4 md:left-8 md:right-8 top-4 flex justify-between text-lg">
        <span>Book a meeting</span>
        <Link href="https://app.midday.ai">
          <Button variant="outline">Create account</Button>
        </Link>
      </div>
      <div className="flex flex-col min-h-screen justify-center container">
        <div className="h-[400px] md:h-[600px] px-4 md:px-0">
          <CalEmbed calLink="pontus-midday/midday-x-vc" theme="dark" />
        </div>
      </div>
    </div>
  );
}
