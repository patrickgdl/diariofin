import React from "react";

export const StepFour = () => {
  return (
    <div className="mt-0 lg:mt-36">
      <div className="relative mx-auto max-w-6xl space-y-12 px-8 lg:flex lg:space-y-0 lg:space-x-24 xl:px-0">
        <div className="relative z-30 flex w-full max-w-xl flex-col lg:w-2/5 lg:items-end lg:justify-start lg:text-right">
          <h2 className="mt-12 bg-gradient-to-br from-slate-900 to-violet-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl sm:leading-none">
            <span className="text-green-500">4. </span>
            Publique
          </h2>
          <p className="mt-5 text-base text-slate-700 md:text-lg">
            Publique-o para o mundo, crie uma rede e aumente seu público.
          </p>
        </div>

        <div className="lg:w-3/5">
          <div className="relative rounded border-2 border-slate-400 bg-white pb-20">
            <div className="absolute inset-x-0 -bottom-2 h-32 scale-110 bg-gradient-to-b from-transparent via-white to-white"></div>
            <div className="px-12 pt-8 pb-10 lg:pl-24 lg:pr-20">
              <div className="relative mt-10">
                <div className="prose relative mt-8">
                  <div className="relative">
                    <div className="action-bar absolute -top-9 flex items-center">
                      <button className="add-header-button relative text-xs font-medium">
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                        <span className="flex items-center space-x-1 rounded-sm bg-slate-100 py-1.5 px-3 text-slate-500 transition hover:bg-violet-500 hover:text-white">
                          Status: Publicado
                        </span>
                      </button>
                    </div>
                    Meu site publicado com meu{" "}
                    <span className="border-b-2 border-blue-300 bg-blue-100">
                      link externo
                    </span>{" "}
                    e com outras estilizações como{" "}
                    <span className="font-bold">negrito</span> e
                    <span className="italic"> ítalico</span>.
                  </div>

                  <div className="font-cursive absolute -right-20 -top-24 hidden w-32 -rotate-3 text-lg leading-tight text-violet-700 lg:block">
                    Seu site está pronto para o mundo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
