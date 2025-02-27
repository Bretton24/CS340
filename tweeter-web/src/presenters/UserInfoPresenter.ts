import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { UserInfoHelpPresenter, UserInfoHelpView } from "./UserInfoHelpPresenter";

export class UserInfoPresenter extends UserInfoHelpPresenter<UserInfoHelpView> {

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    this.setNum(
      this.view.setFolloweeCount,
      () => this.userService.getFolloweeCount(authToken, displayedUser),
      "get followees count"
    )
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    this.setNum(
      this.view.setFollowerCount,
      () => this.userService.getFollowerCount(authToken, displayedUser),
      "get followers count"
    )
  }

  public async unfollowDisplayedUser(event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    this.interactWithDisplayedUser(
      event,
      () => this.userService.unfollow(authToken!, displayedUser!),
      false,
      `Unfollowing ${displayedUser!.name}...`,
      "unfollow user"
    )
  }

  public async followDisplayedUser(
    event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    this.interactWithDisplayedUser(
      event,
      () => this.userService.follow(authToken!, displayedUser!),
      true,
      `Following ${displayedUser!.name}...`,
      "follow user"
    )
  }

    // event.preventDefault();

    // try {
    //   this.isLoading = true;
    //   this.view.displayInfoMessage(
    //     `Unfollowing ${this.view.displayedUser!.name}...`,
    //     0
    //   );

    //   const [followerCount, followeeCount] = await this.userService.unfollow(
    //     this.view.authToken!,
    //     this.view.displayedUser!
    //   );

    //   this.view.setIsFollower(false);
    //   this.view.setFollowerCount(followerCount);
    //   this.view.setFolloweeCount(followeeCount);
    // } catch (error) {
    //   this.view.displayErrorMessage(
    //     `Failed to unfollow user because of exception: ${error}`
    //   );
    // } finally {
    //   this.view.clearLastInfoMessage();
    //   this.isLoading = false;
    // }
  // }


  // public async followDisplayedUser(event: React.MouseEvent): Promise<void> {
  //   event.preventDefault();

  //   try {
  //     this.isLoading = true;
  //     this.view.displayInfoMessage(
  //       `Following ${this.view.displayedUser!.name}...`,
  //       0
  //     );

  //     const [followerCount, followeeCount] = await this.userService.follow(
  //       this.view.authToken!,
  //       this.view.displayedUser!
  //     );

  //     this.view.setIsFollower(true);
  //     this.view.setFollowerCount(followerCount);
  //     this.view.setFolloweeCount(followeeCount);
  //   } catch (error) {
  //     this.view.displayErrorMessage(
  //       `Failed to follow user because of exception: ${error}`
  //     );
  //   } finally {
  //     this.view.clearLastInfoMessage();
  //     this.isLoading = false;
  //   }
  // }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.userService.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    }, "determine follower status"); 
  }
}
