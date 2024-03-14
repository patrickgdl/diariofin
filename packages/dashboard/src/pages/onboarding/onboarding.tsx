import { CaretLeftIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthUser } from "~/contexts/SessionContext"
import { useLocalStorageQuery } from "~/hooks/use-local-storage"
import useAppContext from "~/hooks/useAppContext"
import { useNewAccountsMutation } from "~/hooks/useNewAccountsMutation"
import { useNewCategoriesMutation } from "~/hooks/useNewCategoriesMutation"
import { useNewGroupsMutation } from "~/hooks/useNewGroupsMutation"
import { CategoryGroups } from "~/types/category-groups"
import { TransactionCategories } from "~/types/transaction-categories"
import { Button } from "~/ui/button"
import { Separator } from "~/ui/separator"
import { Stepper, StepperItem, useStepper } from "~/ui/stepper"
import { toast } from "~/ui/use-toast"
import { LOCAL_STORAGE_KEYS } from "~/utils/constants"

import { CategoryOnboarding } from "./constants"
import { AccountMainStep, AccountSecondaryStep } from "./steps/account-step"
import { AppearanceMainStep } from "./steps/appearance-step"
import { TransactionTypesMainStep, TransactionTypesSecondaryStep } from "./steps/transaction-types-step"

import type { AccountWithoutId } from "./steps/account-step"
function BackButton() {
  const { isDisabledStep, prevStep } = useStepper()

  return (
    <div className="flex flex-col items-start">
      <Button variant="link" size="sm" className="px-0" disabled={isDisabledStep} onClick={prevStep}>
        <CaretLeftIcon className="mr-2 h-4 w-4" />
        Voltar
      </Button>
    </div>
  )
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setAccounts } = useAppContext()
  const { id: user_id } = useAuthUser() || {}
  const [selectedCategories, setSelectedCategories] = React.useState<CategoryOnboarding[]>([])

  const newAccounts = useNewAccountsMutation()
  const newCategoryGroups = useNewGroupsMutation()
  const newCategories = useNewCategoriesMutation()

  const [onboardingAccounts, setOnboardingAccounts] = useLocalStorageQuery<AccountWithoutId[]>(
    LOCAL_STORAGE_KEYS.ONBOARDING_ACCOUNTS,
    []
  )

  const handleAddAccount = async (account: AccountWithoutId) => {
    setOnboardingAccounts([...onboardingAccounts, account])
  }

  const handleRemoveAccount = async (account: AccountWithoutId) => {
    const remainingAccounts = onboardingAccounts.filter((a) => a.name !== account.name)
    setOnboardingAccounts(remainingAccounts)
  }

  const handleSelectCategory = (category: CategoryOnboarding) => {
    const selectedIndex = selectedCategories.findIndex((item) => item.name === category.name)
    let newSelected: CategoryOnboarding[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCategories, category)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCategories.slice(1))
    } else if (selectedIndex === selectedCategories.length - 1) {
      newSelected = newSelected.concat(selectedCategories.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCategories.slice(0, selectedIndex),
        selectedCategories.slice(selectedIndex + 1)
      )
    }

    setSelectedCategories(newSelected)
  }

  const mapCategoriesWithGroupId = (groups: Array<CategoryGroups>, category: CategoryOnboarding) => {
    for (const group of groups) {
      if (group.name === category.group) {
        return {
          name: category.name,
          icon: category.icon,
          group_id: group.id,
          user_id: group.user_id,
        }
      }
    }
  }

  const handleFinalize = async () => {
    if (!user_id) return

    if (onboardingAccounts?.length > 0) {
      toast({ title: "Estamos criando suas contas..." })

      const response = await newAccounts.mutateAsync(onboardingAccounts)
      if (response) {
        setAccounts(response)
        toast({ title: "Contas criadas com sucesso" })
      }
    }

    if (selectedCategories.length > 0) {
      toast({ title: "Estamos criando suas categorias..." })

      const selectedGroups = selectedCategories.map((category) => ({
        name: category.group,
        color: category.color,
        user_id: user_id,
      }))

      // Remove duplicates by creating a map with unique group names as keys
      const uniqueMapGroups = new Map<string, Omit<CategoryGroups, "id">>()
      selectedGroups.forEach((category) => {
        if (!uniqueMapGroups.has(category.name)) {
          uniqueMapGroups.set(category.name, category)
        }
      })

      // Convert map values back to an array
      const uniqueGroups = Array.from(uniqueMapGroups.values())

      const response = await newCategoryGroups.mutateAsync(uniqueGroups)

      if (response) {
        const selectedCategoriesWithGroupIds = selectedCategories
          .map((category) => mapCategoriesWithGroupId(response, category))
          .filter((s) => Boolean(s)) as TransactionCategories[]

        await newCategories.mutateAsync(selectedCategoriesWithGroupIds)
      }

      toast({ title: "Categorias criadas com sucesso" })
    }
  }

  const steps = [
    {
      id: 0,
      label: "Contas",
      content: (
        <AccountMainStep
          accounts={onboardingAccounts}
          onAddAccount={handleAddAccount}
          onRemoveAccount={handleRemoveAccount}
        />
      ),
      secondary: <AccountSecondaryStep accounts={onboardingAccounts} />,
    },
    {
      id: 1,
      label: "Tipos de Transação",
      content: <TransactionTypesMainStep selectedCategories={selectedCategories} />,
      secondary: <TransactionTypesSecondaryStep onSelectCategory={handleSelectCategory} />,
    },
    { id: 2, label: "Aparência", content: <AppearanceMainStep onFinalize={handleFinalize} /> },
  ]

  return (
    <div className="h-screen">
      <Stepper initialStep={0} steps={steps} className="space-y-0 h-[calc(100vh-40px)]">
        {steps.map((step) => {
          return (
            <StepperItem key={step.id}>
              <Separator />

              <div className="h-full">
                <div className="md:grid lg:max-w-none lg:grid-cols-[1fr,600px] h-full">
                  <div className="container max-w-xl space-y-12 py-4">
                    <BackButton />

                    {step.content}
                  </div>

                  <div className="h-full flex-col bg-muted p-10 lg:flex dark:border-r">{step.secondary}</div>
                </div>
              </div>
            </StepperItem>
          )
        })}
      </Stepper>
    </div>
  )
}
