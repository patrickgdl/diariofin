import { groupBy } from "lodash"
import { Badge } from "@diariofin/ui/badge"
import { Button } from "@diariofin/ui/button"
import { Card, CardContent } from "@diariofin/ui/card"
import { useStepper } from "@diariofin/ui/stepper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@diariofin/ui/tabs"
import { Toggle } from "@diariofin/ui/toggle"
import { toast } from "@diariofin/ui/use-toast"
import formatCurrency from "~/utils/format-currency"

import { CategoryOnboarding, businessCategories } from "../constants"

type CategoriesProps = {
  selectedCategories: CategoryOnboarding[]
  onSelectCategory: (category: CategoryOnboarding) => void
}

export function CategoriesMainStep({ onSelectCategory, selectedCategories }: CategoriesProps) {
  const { nextStep } = useStepper()
  const groupedByGroup = groupBy(businessCategories, "group")

  const handleNextStep = () => {
    if (selectedCategories.length < 1) {
      toast({
        title: "Nenhuma categoria selecionada",
        description: `Vamos criar somente a categoria "Outros". Você poderá criar novas categorias depois.`,
      })
    }

    nextStep()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Categorias de Transação</h1>
          <p className="text-sm text-muted-foreground">Aqui estão algumas sugestões de categorias.</p>
          <p className="text-sm text-muted-foreground">
            Selecione as quê considerar relevante pro seu negócio. Você poderá criar novas categorias depois.
          </p>
        </div>

        <div className="overflow-y-auto space-y-6 px-2 py-8 h-[calc(100vh-450px)]">
          {Object.entries(groupedByGroup).map(([group, categories]) => (
            <div className="flex flex-col space-y-4" key={group}>
              <p
                className="font-medium leading-none"
                style={{ color: categories.find((c) => c.group === group)?.color }}
              >
                {group}
              </p>

              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <Toggle key={category.name} asChild onPressedChange={() => onSelectCategory(category)}>
                    <Badge
                      style={{ backgroundColor: category.color }}
                      className="data-[state=on]:opacity-100 data-[state=off]:opacity-50"
                    >
                      {category.icon}
                      <span className="ml-1 text-sm font-medium leading-none">{category.name}</span>
                    </Badge>
                  </Toggle>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" variant="outline" onClick={handleNextStep}>
        Continuar
      </Button>
    </div>
  )
}

export function CategoriesSecondaryStep() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Categorias de Transação</h1>
          <p className="text-sm text-muted-foreground">
            Nem toda transação significa a mesma coisa. Nós usamos dois tipos diferentes para classifica-las.
          </p>
        </div>

        <Tabs defaultValue="expense">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="expense">
              Saídas
            </TabsTrigger>
            <TabsTrigger className="w-full" value="income">
              Entrada
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expense" className="space-y-2">
            <div className="space-y-2 py-4">
              <h1 className="text-xl font-semibold tracking-tight">Transações de Saída</h1>
              <p className="text-sm text-muted-foreground">Dinheiro gasto é considerado uma transação de saída</p>
              <p className="text-sm text-muted-foreground">
                Essas transações são organizadas em categorias, então é fácil de acompanhar suas despesas
              </p>
            </div>
          </TabsContent>

          <TabsContent value="income">
            <div className="space-y-6">
              <div className="space-y-2 py-4">
                <h1 className="text-xl font-semibold tracking-tight">Transações de Entrada</h1>
                <p className="text-sm text-muted-foreground">
                  Dinheiro que você ganha é considerado transação de entrada.
                </p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between h-full space-x-4 px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-1 w-1 animate-ping rounded-full bg-green-500" />

                      <p className="text-sm font-medium leading-none">Pix recebido de Fulano</p>
                    </div>

                    <div className="text-sm text-right font-medium text-green-500">{formatCurrency(2050.54)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
