import { useSelector } from "react-redux"
import { RootState } from "../store"

export const useUser = () => {
  const user = useSelector((s: RootState) => s.userReducer)

  return user;
}