import { CalEmbed } from "@/components/cal-embed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale conosco | FluxoZen",
};

export default function Page() {
  return (
    <div className="mt-24">
      <CalEmbed calLink="patrickgdl/15min" />
    </div>
  );
}
