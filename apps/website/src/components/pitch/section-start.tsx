import LogoMark from "../logo-mark";

export function SectionStart() {
  return (
    <div className="min-h-screen">
      <span className="absolute right-4 md:right-8 top-4 text-lg">
        Pitch/2024
      </span>

      <div className="container min-h-screen relative">
        <div className="absolute bottom-auto mt-[150px] -ml-[35px] md:ml-4 md:mt-0 md:bottom-[600px] scale-50 md:scale-100">
          <LogoMark className="w-48 h-48" />
        </div>
        <h1 className="text-[85px] bottom-[250px] left-2 md:text-[350px] absolute md:right-0 md:bottom-8">
          Diariofin
        </h1>
      </div>
    </div>
  );
}
