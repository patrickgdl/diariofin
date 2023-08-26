import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-8 border-b border-zinc-200 py-12 text-slate-800 transition-colors duration-150 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-3">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-slate-800 transition duration-150 ease-in-out hover:text-zinc-500"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-slate-800 transition duration-150 ease-in-out hover:text-zinc-500"
              >
                Sobre
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-slate-800 transition duration-150 ease-in-out hover:text-zinc-500"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-slate-800 transition duration-150 ease-in-out hover:text-zinc-500"
              >
                Política de Privacidade
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-slate-800 transition duration-150 ease-in-out hover:text-zinc-500"
              >
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between space-y-4 py-12 md:flex-row">
        <div>
          <span>&copy; Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
