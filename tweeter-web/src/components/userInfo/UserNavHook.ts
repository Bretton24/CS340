import { AuthToken, User, FakeData } from "tweeter-shared";
import useUserContext from "./UserInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavHookPresenter, UserNavHookView } from "../../presenters/UserNavHookPresenter";
import { useState } from "react";


const useUserNavHook = () => {
    const { setDisplayedUser, currentUser, authToken } =
                useUserContext();
    const { displayErrorMessage } = useToastListener();

    const listener: UserNavHookView = {
        currentUser: currentUser,
        authToken: authToken,
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser
    }

    const [presenter] = useState(new UserNavHookPresenter(listener));
    
    const navigateToUser = (event: React.MouseEvent) => presenter.navigateToUser(event);
    return (
        navigateToUser
    );
}

export default useUserNavHook;