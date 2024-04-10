import * as PopoverPrimitive from "@radix-ui/react-popover"
import ReactEmojiPicker, { Categories as EmojiCategories, Theme } from "emoji-picker-react"
import { LaughIcon } from "lucide-react"
import { useTheme } from "next-themes"
import useMediaQuery from "~/hooks/use-media-query"
import { Button } from "~/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "~/ui/tooltip"

type EmojiPickerProps = {
  emoji?: string
  setEmoji: (emoji: string) => void
}

export function EmojiPicker({ emoji, setEmoji }: EmojiPickerProps) {
  const { resolvedTheme } = useTheme()
  const { isDesktop } = useMediaQuery()

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" aria-label="Escolher um Emoji">
              {emoji ? <span className="text-3xl">{emoji}</span> : <LaughIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Escolha um Emoji</TooltipContent>
        </Tooltip>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content side={isDesktop ? "right" : "bottom"} className="z-[51]">
        <ReactEmojiPicker
          searchDisabled
          skinTonesDisabled
          previewConfig={{
            showPreview: false,
          }}
          height={400}
          categories={[
            {
              category: EmojiCategories.SMILEYS_PEOPLE,
              name: "Rostos",
            },
            {
              category: EmojiCategories.ANIMALS_NATURE,
              name: "Animais",
            },
            {
              category: EmojiCategories.ACTIVITIES,
              name: "Atividades",
            },
            {
              category: EmojiCategories.FLAGS,
              name: "Bandeiras",
            },
            {
              category: EmojiCategories.FOOD_DRINK,
              name: "Comida & Bebidas",
            },
            {
              category: EmojiCategories.OBJECTS,
              name: "Objetos",
            },
            {
              category: EmojiCategories.SYMBOLS,
              name: "Símbolos",
            },
          ]}
          onEmojiClick={(e) => setEmoji(e.emoji)}
          theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  )
}
