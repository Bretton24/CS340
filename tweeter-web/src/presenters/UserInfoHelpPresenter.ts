import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { Presenter, View } from "./Presenter";


export interface UserInfoHelpView extends View {
    setFolloweeCount: React.Dispatch<React.SetStateAction<number>>;
    setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
      ) => void;
    clearLastInfoMessage: () => void;
    setIsFollower: React.Dispatch<React.SetStateAction<boolean>>;
}

export class UserInfoHelpPresenter <V extends UserInfoHelpView> extends Presenter<V>{
    private _userService: UserService;
    private isLoading: boolean;

    public constructor(view: V) {
        super(view);
        this._userService = new UserService();
        this.isLoading = false;
    }

    protected get userService() {
        return this._userService;
    }

    
    protected setNum(
        setCountFunction: (value: React.SetStateAction<number>) => void,
        getCountFunction: () => Promise<number>,
        errorMessage: string
    ) {
        this.doFailureReportingOperation(async () => {
            const count = await getCountFunction();
            setCountFunction(count);
        },errorMessage)
    }

    protected interactWithDisplayedUser(
        event: React.MouseEvent,
        action: () => Promise<[followerCount: number, followeeCount: number]>,
        isFollowing: boolean,
        successMessage: string,
        errorMessage: string
    ) {
        event.preventDefault();

        this.doFailureReportingOperation(async () => {
            this.isLoading = true;
            this.view.displayInfoMessage(
                successMessage,
                0
            );

            const [followerCount, followeeCount] = await action();

            this.view.setIsFollower(isFollowing);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        }, errorMessage,
        () => {
            this.view.clearLastInfoMessage();
            this.isLoading = false;
        })
    }
}