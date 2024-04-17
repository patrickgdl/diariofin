import LogoMark from "~/components/logo-mark"
import { MenuOption, useCommandStore } from "~/store/command"
import { shuffle } from "~/utils/shuffle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@fluxozen/ui/card"

import { Input } from "@fluxozen/ui/input"

type InsightsWidgetProps = {
  id: string
  label: string
}

export function InsightsWidget({ items }: { items: InsightsWidgetProps[] }) {
  const { setOpen } = useCommandStore()

  return (
    <>
      <ul className="flex flex-col justify-center items-center space-y-3 flex-shrink">
        {items.map((example) => (
          <li
            key={example.id}
            className="rounded-lg dark:bg-secondary bg-[#F2F1EF] text-xs font-mono hover:opacity-80 transition-all cursor-default"
          >
            <button onClick={() => setOpen(MenuOption.AI)} type="button" className="inline-block p-3 py-2">
              <span>{example.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="relative h-10 w-full">
        <Input
          type="text"
          placeholder="Faça uma pergunda para a IA da Fluxozen..."
          className="w-full h-11 rounded-lg cursor-pointer bg-background"
          onFocus={() => setOpen(MenuOption.AI)}
        />

        <LogoMark className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 pointer-events-none h-5 w-5" />
      </div>
    </>
  )
}

const defaultExamples = [
  {
    id: 1,
    label: `Qual é a taxa de consumo do meu negócio?`,
  },
  {
    id: 2,
    label: "Quanto dinheiro ganhei no mês passado?",
  },
  {
    id: 3,
    label: "Quanto gastei em alimentação no ano passado?",
  },
  {
    id: 4,
    label: "Mostre-me todos os custos recorrentes deste ano",
  },
  {
    id: 5,
    label: "Quanto gastei em impostos esse mês?",
  },
  {
    id: 6,
    label: "Quais são nossas maiores categorias de despesas?",
  },
]

const items = shuffle(defaultExamples).slice(0, 5)

export function Insights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights 🪄</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-1 flex-col justify-center items-center space-y-20">
          <InsightsWidget items={items} />
        </div>
      </CardContent>
    </Card>
  )
}
