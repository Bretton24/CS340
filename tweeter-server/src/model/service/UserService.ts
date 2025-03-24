import { AuthToken, AuthTokenDto, FakeData, User, UserDto } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService {
    public async login(
        alias: string,
        password: string
      ): Promise<[UserDto, AuthTokenDto]>{
        // TODO: Replace with the result of calling the server
        const user = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user.dto, FakeData.instance.authToken.dto];
    };

    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: string,
        imageFileExtension: string
      ): Promise<[UserDto, AuthTokenDto]> {
        const user = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error("Invalid registration");
        }
    
        return [user.dto, FakeData.instance.authToken.dto];
      };

      public async logout(token: string): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
      };

    public async getUser(
        token: string,
        alias: string
        ): Promise<UserDto | null> {
            // TODO: Replace with the result of calling server
            const user = FakeData.instance.findUserByAlias(alias);
            return user?.dto || null;
        };

    public async getFolloweeCount(
        authToken: AuthToken,
        user: User
        ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweeCount(user.alias);
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
      ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        const followerCount = await this.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.getFolloweeCount(authToken, userToFollow);
    
        return [followerCount, followeeCount];
      };

    public async getFollowerCount(
        token: AuthToken,
        user: User
      ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowerCount(user.alias);
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
        ): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await this.getFolloweeCount(authToken, userToUnfollow);

        return [followerCount, followeeCount];
    };

    public async getIsFollowerStatus (
        token: string,
        user: UserDto,
        selectedUser: UserDto
      ): Promise<boolean>{
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };

    
}