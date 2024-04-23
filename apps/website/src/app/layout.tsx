import "@/styles/globals.css";
import "@diariofin/ui/globals.css";

import { inter, satoshi } from "@/styles/fonts";
import { Footer } from "@/components/footer";
import { FooterCTA } from "@/components/footer-cta";
import { Header } from "@/components/header";
import { cn } from "@diariofin/ui/utils";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { LogSnagProvider } from "../events/client";
import { Provider } from "./provider";

import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://diariofin.com"),
  title: "Diariofin | Seu negócio de maneira mais inteligente",
  description:
    "O Diariofin fornece uma visão melhor do seu negócio e automatiza as tarefas chatas, permitindo que você se concentre no que você gosta de fazer.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(satoshi.variable, inter.variable)}
    >
      <head>
        <LogSnagProvider
          token={process.env.NEXT_PUBLIC_LOGSNAG_TOKEN!}
          project={process.env.NEXT_PUBLIC_LOGSNAG_PROJECT!}
          // disableTracking={Boolean(process.env.NEXT_PUBLIC_LOGSNAG_DISABLED!)}
        />

        <link rel="canonical" href="https://diariofin.com" />
      </head>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "bg-[#F6F6F3] dark:bg-[#0C0C0C] overflow-x-hidden"
        )}
      >
        <Provider>
          <Header />
          <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
            {children}
          </main>
          <FooterCTA />
          <Footer />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
