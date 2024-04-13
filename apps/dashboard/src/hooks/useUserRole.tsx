import { useUser } from "./useUser"

/**
 * This hook is used to get the user role.
 */
const useUserRole = () => {
  const { userDetails } = useUser()

  return userDetails?.role || "user"
}

export default useUserRole
