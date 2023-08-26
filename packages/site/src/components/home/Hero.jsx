import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className="text-center">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Confira nosso novo editor de convites.{" "}
          <a href="#" className="font-semibold text-fuchsia-600">
            <span className="absolute inset-0" aria-hidden="true"></span>Saiba
            mais <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <h1 className="relative text-4xl font-extrabold leading-tight tracking-tight text-slate-800 lg:text-center lg:text-6xl">
        <span>Crie seu </span>
        <span className="mt-1 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent xl:mt-0 xl:inline">
          convite digital
        </span>
        <span> em </span>
        <span className="relative inline-flex md:border-b-4 md:border-fuchsia-300/50 md:pb-2">
          <span> minutos</span>
        </span>
      </h1>

      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Crie seu convite digital em minutos e compartilhe com seus amigos e
        familiares.
      </p>

      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <Link
            href="/template"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 md:py-4 md:text-lg md:px-10"
          >
            Comece agora
          </Link>
        </div>
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <Link
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-fuchsia-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
          >
            Como funciona
          </Link>
        </div>
      </div>
    </div>
  );
};
