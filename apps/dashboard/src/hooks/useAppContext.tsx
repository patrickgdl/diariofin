import { AppContext } from "~/contexts/AppContext"
import { useContext } from "react"

const useAppContext = () => {
  const state = useContext(AppContext)

  return { ...state }
}

export default useAppContext
