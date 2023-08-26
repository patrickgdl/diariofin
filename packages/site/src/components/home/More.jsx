import React from "react";

const soon = ["Integração com Medium", "Threads no Twitter", "Analytics"];

export const More = () => {
  return (
    <div className="mt-40 mb-40">
      <div>
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2 className="bg-gradient-to-br from-slate-900 to-violet-700  bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:leading-none lg:text-4xl">
            E o que mais?
          </h2>
          <p className="mt-4 text-lg text-slate-700 lg:max-w-lg">
            Podemos converter seus textos para mais do que apenas uma postagem
            no blog. Reutilize seu conteúdo de outras maneiras.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-2xl space-y-8 px-4 sm:px-6 lg:px-8 xl:px-0">
          {soon.map((feature) => (
            <div
              key={feature.split(" ")[0]}
              className="relative col-span-full flex flex-col items-center gap-2 rounded bg-gradient-to-r from-fuchsia-100 to-pink-200 p-10 shadow-2xl md:col-span-8 md:flex-row md:items-start md:text-left lg:gap-8"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="mb-1.5">
                  <span className="inline-flex rounded-full border border-green-300 bg-green-200 px-2 text-xs text-green-800">
                    Em breve…
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-medium text-slate-900">{feature}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
