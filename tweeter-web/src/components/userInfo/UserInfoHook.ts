import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const useUserContext = () => useContext(UserInfoContext);

export default useUserContext;