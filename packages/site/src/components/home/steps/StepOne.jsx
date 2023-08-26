import React from "react";

export const StepOne = () => {
  return (
    <div className="mt-24 lg:mt-32">
      <div className="relative mx-auto max-w-6xl space-y-12 px-8 lg:flex lg:space-y-0 lg:space-x-24 xl:px-0">
        <div className="relative z-30 flex w-full max-w-xl flex-col lg:w-2/5">
          <h2 className="mt-12 bg-gradient-to-br from-slate-900 to-violet-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl sm:leading-none">
            <span className="text-yellow-300">1. </span>
            Escreva
          </h2>
          <p className="mt-5 text-base text-slate-700 md:text-lg">
            Escreva à mão seu conteúdo e ideias. Use um caderno, diário ou
            qualquer pedaço de papel.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center lg:w-3/5">
          <div className="relative h-40 rounded shadow-2xl shadow-violet-700/80 ring-2 ring-violet-900 ring-offset-2 saturate-150">
            <img
              src="https://i0.wp.com/thepostmansknock.com/wp-content/uploads/2017/03/1cursive_worksheet-12-of-15.jpg?resize=960%2C633&ssl=1"
              className="h-full rounded object-cover"
            />
          </div>
          <div className="relative mt-20 grid max-w-[50px] grid-cols-2 gap-1">
            <div
              className="hidden items-center space-x-2 whitespace-nowrap rounded bg-white py-3 px-5 text-xs text-slate-500 shadow-xl shadow-slate-300/20 md:absolute md:-left-52 md:-top-3 md:flex md:animate-bounce"
              style={{ animationDuration: "8s" }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"></path>
                </g>
              </svg>
              <span>Escrevendo histórias…</span>
            </div>
            <div
              className="hidden items-center space-x-2 whitespace-nowrap rounded bg-white py-3 px-5 text-xs text-slate-500 shadow-xl shadow-slate-300/20 md:absolute md:-right-20 md:top-11 md:flex md:animate-bounce"
              style={{ animationDuration: "6s" }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"></path>
                </g>
              </svg>
              <span>Escrevendo seu diário…</span>
            </div>
            <div
              className="hidden items-center space-x-2 whitespace-nowrap rounded bg-white py-3 px-5 text-xs text-slate-500 shadow-xl shadow-slate-300/20 md:absolute md:-right-60 md:-bottom-8 md:flex md:animate-bounce"
              style={{ animationDuration: "9s" }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"></path>
                </g>
              </svg>
              <span>Rascunhos de sua tese…</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
