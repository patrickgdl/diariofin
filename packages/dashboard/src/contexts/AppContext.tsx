import React, { createContext, useState } from "react"

interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  const context = {
    isMobile,
    setIsMobile,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
