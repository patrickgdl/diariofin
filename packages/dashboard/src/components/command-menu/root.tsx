import { MenuOption, useCommandStore } from "~/store/command"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/ui/command"
import { ArrowLeftIcon, ArrowRightIcon, BellIcon, MessageCircleQuestion } from "lucide-react"
import { useNavigate } from "react-router-dom"

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Transações",
    path: "/transactions",
  },
  {
    name: "Contas",
    path: "/accounts",
  },
  {
    name: "Categorias",
    path: "/categories",
  },
  {
    name: "Configurações",
    path: "/settings",
  },
]

export function CommandRoot() {
  const { setMenu, setOpen } = useCommandStore()
  const navigate = useNavigate()

  return (
    <div>
      <CommandInput placeholder="Digite um comando ou busca..." autoFocus />
      <CommandList>
        <CommandEmpty>Sem resultados encontrados.</CommandEmpty>

        <CommandGroup heading="Sugestão">
          <CommandItem onSelect={() => setMenu(MenuOption.AI)}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-[20px] w-[20px] text-[#0091ff]"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"></path>
            </svg>

            <div className="flex items-center justify-between w-full">
              <span>Pergunte a IA da Fluxozen...</span>

              <span
                className="relative rounded-lg overflow-hidden border dark:p-[1px] dark:border-none"
                style={{
                  background:
                    "linear-gradient(-45deg, rgba(235,248,255,.18) 0%, #848f9c 50%, rgba(235,248,255,.18) 100%)",
                }}
              >
                <span className="flex items-center py-[3px] px-3 rounded-[7px] bg-background text-[10px] h-full font-normal">
                  Experimental
                </span>
              </span>
            </div>
          </CommandItem>
          {/* <CommandItem onSelect={() => setMenu(MenuOption.Notifications)}>
            <BellIcon size={18} className="mr-2" />
            <span>Últimas Notificações</span>
          </CommandItem> */}
          <CommandItem onSelect={() => setMenu(MenuOption.Feedback)}>
            <MessageCircleQuestion size={18} className="mr-2" />
            <span>Enviar Feedback</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Navegação" className="pb-6">
          {navigation.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => {
                navigate(item.path)
                setOpen()
              }}
            >
              <ArrowRightIcon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </div>
  )
}
