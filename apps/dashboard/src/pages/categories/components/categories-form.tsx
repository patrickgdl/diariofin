import { Button } from "@fluxozen/ui/button"
import { ColorPicker, SOLID_COLORS } from "@fluxozen/ui/color-picker"
import { useToast } from "@fluxozen/ui/use-toast"
import * as React from "react"
import { EmojiPicker } from "~/components/emoji-picker"
import { GroupCombobox } from "~/components/group-combobox"
import { useAuthUser } from "~/contexts/SessionContext"
import { useNewCategoryGroup } from "~/hooks/use-new-category-group"
import { popModal } from "~/modals"

import useCategoryGroups from "../hooks/use-category-groups"
import { useNewCategory } from "../hooks/use-new-category"
import { useUpdateCategoryGroup } from "../hooks/use-update-category-group"

export function CategoriesForm() {
  const user = useAuthUser()
  const { toast } = useToast()

  const newCategory = useNewCategory()
  const newCategoryGroup = useNewCategoryGroup()
  const updateCategoryGroup = useUpdateCategoryGroup()
  const { data } = useCategoryGroups({ userId: user?.id! })

  const [name, setName] = React.useState<string>()
  const [emoji, setEmoji] = React.useState<string>()
  const [group, setGroup] = React.useState<{ id: string; isNew: boolean }>()
  const [background, setBackground] = React.useState(SOLID_COLORS[0])

  const handleSubmit = async () => {
    if (!user?.id) return

    if (group?.id && name && emoji) {
      await newCategory.mutateAsync({
        name,
        icon: emoji,
        user_id: user?.id!,
        group_id: group.id,
      })

      toast({ title: "Categoria criada com sucesso" })

      if (group.isNew) {
        // update color only
        await updateCategoryGroup.mutateAsync({
          id: group.id!,
          group: {
            color: background,
          },
        })
      }

      popModal("DialogCategory")
    } else if (!name) {
      toast({ title: "Nome da categoria não preenchido", variant: "destructive" })
    } else if (!emoji) {
      toast({ title: "Escolha um ícone/emoji", variant: "destructive" })
    } else if (!group?.id) {
      toast({ title: "Escolha um grupo para vincular a categoria", variant: "destructive" })
    }
  }

  const createNewCategoryGroup = async (groupName: string) => {
    if (!user?.id) return

    if (groupName) {
      const response = await newCategoryGroup.mutateAsync({
        user_id: user?.id!,
        name: groupName,
      })

      if (response) {
        setGroup({ id: response.id, isNew: true })
        toast({ title: `${response.name} criado com sucesso` })
      }
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <EmojiPicker emoji={emoji} setEmoji={setEmoji} />

        <input
          autoFocus
          placeholder="Nome da Categoria"
          style={{ width: `${name?.length ? name.length + 1 : 16}ch` }}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          className="flex h-9 rounded-md bg-background font-semibold py-1 text-xl transition-colors placeholder:text-gray-300 dark:placeholder:text-slate-500 placeholder:font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        <fieldset className="flex flex-col justify-center items-center space-y-3 !mt-6">
          <legend className="font-semibold tracking-tight text-sm">Grupo da nova categoria</legend>

          {data && data.length > 0 && (
            <GroupCombobox
              value={group?.id}
              onCreate={createNewCategoryGroup}
              onValueChange={(id) => setGroup({ id, isNew: false })}
              groups={data?.map(({ id, name }) => ({ label: name, value: id }))}
            />
          )}

          {group?.isNew && <ColorPicker color={background} setColor={setBackground} />}
        </fieldset>
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Salvar
      </Button>
    </div>
  )
}
