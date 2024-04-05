import * as React from "react"
import { EmojiPicker } from "~/components/emoji-picker"
import { GroupCombobox } from "~/components/group-combobox"
import { useAuthUser } from "~/contexts/SessionContext"
import { useNewCategoryGroup } from "~/hooks/use-new-category-group"
import { Button } from "~/ui/button"
import { ColorPicker, SOLID_COLORS } from "~/ui/color-picker"
import { useToast } from "~/ui/use-toast"

import useCategoryGroups from "../hooks/use-category-groups"
import { useNewCategory } from "../hooks/use-new-category"
import { useUpdateCategoryGroup } from "../hooks/use-update-category-group"

export function CategoriesForm({ onFinish }: { onFinish: () => void }) {
  const user = useAuthUser()
  const { toast } = useToast()

  const newCategory = useNewCategory()
  const newCategoryGroup = useNewCategoryGroup()
  const updateCategoryGroup = useUpdateCategoryGroup()
  const { data } = useCategoryGroups({ userId: user?.id! })

  const [groupId, setGroupId] = React.useState<string>()
  const [name, setName] = React.useState<string>()
  const [emoji, setEmoji] = React.useState<string>()
  const [background, setBackground] = React.useState(SOLID_COLORS[0])

  const handleSubmit = async () => {
    if (!user?.id) return

    if (groupId && name && emoji && background) {
      await newCategory.mutateAsync({
        name,
        icon: emoji,
        user_id: user?.id!,
        group_id: groupId,
      })

      toast({ title: "Categorias criadas com sucesso" })

      // update color only
      await updateCategoryGroup.mutateAsync({
        id: groupId!,
        group: {
          color: background,
        },
      })

      onFinish()
    } else {
      toast({ title: "Campos não preenchidos", variant: "destructive" })
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
        setGroupId(response.id)
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
          style={{ width: `${name?.length || 16}ch` }}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          className="flex h-9 rounded-md bg-background font-semibold py-1 text-xl transition-colors placeholder:text-gray-300 dark:placeholder:text-slate-500 placeholder:font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        <fieldset className="flex flex-col justify-center items-center space-y-3 !mt-6">
          <legend className="font-semibold tracking-tight text-sm">Grupo da nova categoria</legend>

          <GroupCombobox
            value={groupId}
            onValueChange={setGroupId}
            onCreate={createNewCategoryGroup}
            groups={data?.map(({ id, name }) => ({ label: name, value: id }))}
          />

          <ColorPicker color={background} setColor={setBackground} />
        </fieldset>
      </div>

      <Button
        style={{
          backgroundColor: background,
        }}
        className="w-full"
        onClick={handleSubmit}
      >
        Salvar
      </Button>
    </div>
  )
}
