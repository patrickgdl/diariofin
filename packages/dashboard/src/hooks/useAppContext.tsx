import { AppContext } from "~/contexts/AppContext"
import { useContext } from "react"

const useAppContext = () => {
  const { isMobile, setIsMobile, activePanel, setActivePanel, activeSubMenu, setActiveSubMenu } = useContext(AppContext)

  return {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    activeSubMenu,
    setActiveSubMenu,
  }
}

export default useAppContext
