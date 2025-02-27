import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavHookView extends View{
    setDisplayedUser: (user: User) => void
}

export class UserNavHookPresenter extends Presenter<UserNavHookView>{
    private userService: UserService;
    
    public constructor(view: UserNavHookView) {
        super(view);
        this.userService = new UserService();
    }
    
    public async navigateToUser (event: React.MouseEvent, currentUser: User | null, authToken: AuthToken | null): Promise<void> {
        event.preventDefault();
        this.doFailureReportingOperation(async () => {
            const alias = this.extractAlias(event.target.toString());

            const user = await this.userService.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        },"get user");
    };

    public extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };
    
}