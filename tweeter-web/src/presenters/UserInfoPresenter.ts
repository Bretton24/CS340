import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export interface UserInfoView {
    setFolloweeCount: React.Dispatch<React.SetStateAction<number>>
    setFollowerCount: React.Dispatch<React.SetStateAction<number>>
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
    setIsFollower: React.Dispatch<React.SetStateAction<boolean>>
    displayedUser: User | null
    authToken: AuthToken | null
}

export class UserInfoPresenter {
    private view: UserInfoView;
    private userService: UserService;
    private isLoading = false;

    public constructor(view: UserInfoView) {
        this.view = view;
        this.userService = new UserService();
    }

    public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFolloweeCount(await this.userService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
          );
        }
    };

     public async unfollowDisplayedUser(
        event: React.MouseEvent
      ): Promise<void>{
        event.preventDefault();
    
        try {
          this.isLoading = true;
          this.view.displayInfoMessage(
            `Unfollowing ${this.view.displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.userService.unfollow(
            this.view.authToken!,
            this.view.displayedUser!
          );
    
          this.view.setIsFollower(false);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.isLoading = false;
        }
      };

    public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFollowerCount(await this.userService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
          );
        }
      };

      public async followDisplayedUser(
        event: React.MouseEvent
      ): Promise<void>{
        event.preventDefault();
    
        try {
          this.isLoading = true;
          this.view.displayInfoMessage(`Following ${this.view.displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.userService.follow(
            this.view.authToken!,
            this.view.displayedUser!
          );
    
          this.view.setIsFollower(true);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.isLoading = false;
        }
    };
    
    public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ){
        try {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(await this.userService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!));
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`
          );
        }
      };
}