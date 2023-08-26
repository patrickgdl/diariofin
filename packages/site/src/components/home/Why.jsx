import React from "react";
import {
  ArrowDownOnSquareStackIcon,
  SignalIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Alcance",
    description: "Alcance mais pessoas a partir de seu compartilhamento.",
    icon: SignalIcon,
  },
  {
    name: "Compartilhamento",
    description: "Salvar e compartilhar seu conteúdo.",
    icon: ShareIcon,
  },
  {
    name: "Reprodução",
    description: "Seu convite no celular, tablet, computador, onde for",
    icon: ArrowDownOnSquareStackIcon,
  },
];

export const Why = () => {
  return (
    <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-8 px-8 lg:grid-cols-2 xl:px-0">
      <div className="flex flex-col justify-center">
        <h2 className="bg-gradient-to-br from-fuchsia-900 to-violet-500  bg-clip-text text-4xl font-bold leading-relaxed tracking-tight text-transparent ">
          Por que um convite digital?
        </h2>
        <p className="mt-4 text-lg text-slate-700 lg:max-w-lg">
          Um convite digital é uma forma de compartilhar seu conteúdo com mais
          pessoas. Você pode criar um convite digital para seu evento, seu
          aniversário, seu casamento, seu chá de bebê, seu chá de panela, seu
          chá de lingerie, seu chá de casa nova e muito mais.
        </p>
      </div>

      {features.map((feature) => (
        <div key={feature.name} className="pt-6">
          <div className="flow-root rounded-lg bg-gradient-to-br from-fuchsia-50 to-pink-50 px-6 pb-8 saturate-100">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center rounded-md border bg-white p-3 shadow-lg">
                  <feature.icon
                    className="h-6 w-6 text-slate-500"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium tracking-tight text-slate-900">
                {feature.name}
              </h3>
              <p className="mt-5 text-base text-slate-900">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
