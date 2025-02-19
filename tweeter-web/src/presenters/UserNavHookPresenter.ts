import { AuthToken, User } from "tweeter-shared";
import useToastListener from "../components/toaster/ToastListenerHook";
import useUserContext from "../components/userInfo/UserInfoHook";
import { UserService } from "../model-service/UserService";

export interface UserNavHookView {
    currentUser: User | null
    authToken: AuthToken | null
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    setDisplayedUser: (user: User) => void
}

export class UserNavHookPresenter {

    private view: UserNavHookView;
    private userService: UserService;
    public constructor(view: UserNavHookView) {
        this.view = view;
        this.userService = new UserService();
    }
    
    public async navigateToUser (event: React.MouseEvent): Promise<void> {
        event.preventDefault();

        try {
            const alias = this.extractAlias(event.target.toString());

            const user = await this.userService.getUser(this.view.authToken!, alias);

            if (!!user) {
            if (this.view.currentUser!.equals(user)) {
                this.view.setDisplayedUser(this.view.currentUser!);
            } else {
                this.view.setDisplayedUser(user);
            }
            }
        } catch (error) {
            this.view.displayErrorMessage("Failed to get user because of exception: ${error}");
        }
    };

    public extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };
    
}