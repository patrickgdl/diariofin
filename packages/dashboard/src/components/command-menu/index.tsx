import { motion } from "framer-motion"
import { useHotkeys } from "react-hotkeys-hook"
import { MenuOption, useCommandStore } from "~/store/command"
import { CommandDialog } from "~/ui/command"

import { CommandAI } from "./ai"
import { CommandFeedback } from "./feedback"
import { CommandNotifications } from "./notifications"
import { CommandRoot } from "./root"

export const CommandComponent = ({ selected = MenuOption.Root }) => {
  const { setMenu } = useCommandStore()

  const Component = {
    [MenuOption.Root]: <CommandRoot />,
    [MenuOption.AI]: <CommandAI />,
    [MenuOption.Notifications]: <CommandNotifications />,
    [MenuOption.Feedback]: <CommandFeedback />,
  }[selected]

  useHotkeys("ctrl+backspace", () => setMenu(MenuOption.Root))

  return (
    <motion.div
      className="h-full"
      key={selected}
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.98, opacity: 0 }}
    >
      {Component}
    </motion.div>
  )
}

export function CommandMenu() {
  const { isOpen, setOpen, selected } = useCommandStore()

  useHotkeys("ctrl+k", () => setOpen())
  useHotkeys("meta+k", () => setOpen())

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandComponent selected={selected} />
    </CommandDialog>
  )
}
