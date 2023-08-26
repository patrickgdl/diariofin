import React from "react";
import { Toaster } from "react-hot-toast";

import { Background, Features, Hero, More, Why } from "../components/home";
import Layout from "../components/layout";

const Home = () => {
  return (
    <Layout>
      <div className="relative isolate">
        <Background />

        <div className="h-screen">
          <div className="flex h-[calc(100%_-_150px)] flex-col items-center justify-center text-center">
            <Hero />
          </div>
        </div>

        <Why />

        <Features />

        <More />

        <Toaster />
      </div>
    </Layout>
  );
};

export default Home;
