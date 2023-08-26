import React from "react";

export const StepTwo = () => {
  return (
    <div className="mt-32 lg:mt-44">
      <div className="relative mx-auto max-w-6xl space-y-12 px-8 lg:flex lg:space-y-0 lg:space-x-24 xl:px-0">
        <div className="relative z-30 flex w-full max-w-xl flex-col lg:w-2/5 lg:items-end lg:justify-start lg:text-right">
          <h2 className="mt-12 bg-gradient-to-br from-slate-900 to-violet-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl sm:leading-none">
            <span className="text-blue-500">2. </span>
            Foto
          </h2>
          <p className="mt-5 text-base text-slate-700 md:text-lg">
            Tire uma foto da sua página. E faça o upload aqui. Nossa IA irá
            convertê-la em uma página do site.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center lg:w-3/5">
          <div className="relative h-40 rounded shadow-2xl shadow-violet-700/80 ring-2 ring-violet-900 ring-offset-2 saturate-150">
            <img
              src="/taking-picture.png"
              className="h-full rounded object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
