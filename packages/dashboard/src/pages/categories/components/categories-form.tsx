import * as React from "react"

import { ColorPicker } from "~/ui/color-picker"

export function CategoriesForm() {
  const [background, setBackground] = React.useState("#B4D455")

  return (
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        <input
          className="flex h-9 rounded-md bg-background font-semibold py-1 text-xl w-56 transition-colors placeholder:text-gray-300 dark:placeholder:text-slate-500 placeholder:font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          autoFocus
          placeholder="Nome da Categoria"
          onChange={console.log}
        />
      </div>

      <div className="mt-3 flex items-center justify-center">
        <ColorPicker color={background} setColor={setBackground} />
      </div>
    </div>
  )
}
