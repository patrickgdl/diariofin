import { BlurryCircle } from "@/components/blurry-circle";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";

const testimonials = [
  {
    name: "Lucas Grey",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1744288035314008064/kAQycMrk_400x400.png",
    handle: "@ImLucasGrey",
    verified: true,
    quote: "This is so ingenious and good!",
  },
  {
    name: "Bailey Simrell",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1488962358609330178/tdTC7o6M_400x400.jpg",
    handle: "@baileysimrell",
    verified: true,
    quote: "Awesome man, looks amazing 🔥",
  },
  {
    name: "Gokul",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1687344852600516608/gVS34j7h_400x400.jpg",
    handle: "@KyTechInc",
    verified: true,
    quote: "🖤 Awesome work. just love it.",
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
