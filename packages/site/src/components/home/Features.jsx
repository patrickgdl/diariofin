import React from "react";
import { StepOne, StepTwo, StepThree, StepFour } from "./steps";

export const Features = () => {
  return (
    <React.Fragment>
      <div id="features" className="mt-28 lg:mt-40">
        <section className="relative py-5">
          <div className="flex flex-col items-center justify-center sm:text-center">
            <h2 className="bg-gradient-to-br from-fuchsia-900 to-violet-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent ">
              Como funciona?
            </h2>
            <p className="mt-4 text-lg text-slate-700 lg:max-w-lg">
              Em 4 etapas e tudo estará pronto
            </p>
          </div>
        </section>
      </div>

      <StepOne />

      <StepTwo />

      <StepThree />

      <StepFour />
    </React.Fragment>
  );
};
