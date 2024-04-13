import { BlurryCircle } from "@/components/blurry-circle";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";

const testimonials = [
  {
    name: "Fulano de Tal",
    avatarUrl: "",
    handle: "@fulano",
    verified: true,
    quote: "Adoro isso!!",
  },
  {
    name: "John Doe",
    avatarUrl: "",
    handle: "@fulano",
    verified: true,
    quote: "Muito bom 🔥",
  },
  {
    name: "Aaron Smith",
    avatarUrl: "",
    handle: "@fulano",
    verified: true,
    quote: "🖤 Trabalho incrível! 🔥🔥",
  },
];

export function Testimonials() {
  return (
    <div className="relative pb-22">
      <h3 className="text-4xl mb-8">O que as pessoas dizem</h3>
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      <BlurryCircle className="absolute top-2 right-[200px] bg-[#3633D0]/10 -z-10 hidden md:block" />
    </div>
  );
}
