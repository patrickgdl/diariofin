import { Inter } from "next/font/google";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={`relative bg-white overflow-hidden ${inter.className} `}>
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </header>

      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">{children}</main>

      <Footer />
    </div>
  );
}
