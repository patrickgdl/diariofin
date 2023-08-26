import { PanelType } from "~/constants/app-options"
import React, { createContext, useState } from "react"

interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activePanel: PanelType
  setActivePanel: (option: PanelType) => void
  activeSubMenu: string | null
  setActiveSubMenu: (option: string) => void
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activePanel: PanelType.IMAGENS,
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: (value: string) => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.IMAGENS)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)

  const context = {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    activeSubMenu,
    setActiveSubMenu,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
