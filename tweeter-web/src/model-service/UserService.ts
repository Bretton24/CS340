import { AuthToken, FakeData, FollowerStatusRequest, GetUserRequest, LoginRequest, RegisterRequest, TweeterRequest, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { Service } from "./Service";

export class UserService extends Service {
    public async login(
        alias: string,
        password: string
      ): Promise<[User, AuthToken]>{
        // TODO: Replace with the result of calling the server
        const request: LoginRequest = {
          alias: alias,
          password: password
        }

        const [user,authToken] = await this.serverFacade.login(request,"/login/list","Unable to login"); 
    
        if (user === null) {
          throw new Error("Invalid alias or password");
        }
    
        return [user, authToken];
    };

    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
      ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
          Buffer.from(userImageBytes).toString("base64");
        
        const request: RegisterRequest = {
          firstName: firstName,
          lastName: lastName,
          alias: alias,
          password: password,
          userImageBytes: imageStringBase64,
          imageFileExtension: imageFileExtension
        }
        // TODO: Replace with the result of calling the server
        const [user,authToken] = await this.serverFacade.register(request,"/register/list","unable to register user")
    
        if (user === null) {
          throw new Error("Invalid registration");
        }
    
        return [user, authToken];
      };

      public async logout(authToken: AuthToken): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
        const request: TweeterRequest = {
          token: authToken.token
        }
        this.serverFacade.logout(request,"/logout/list","unable to logout");
      };

    public async getUser(
        authToken: AuthToken,
        alias: string
        ): Promise<User | null> {
            const request: GetUserRequest = {
              token: authToken.token,
              userAlias: alias
            }
           return await this.serverFacade.getUser(request,"/getuser/list","unable to find user");
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
        authToken: AuthToken,
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
        authToken: AuthToken,
        user: User,
        selectedUser: User
      ): Promise<boolean>{
        const request: FollowerStatusRequest = {
          token: authToken.token,
          user: user.dto,
          selectedUser: selectedUser.dto
        }
        return this.serverFacade.followerStatus(request,"/followerstatus/list","Unable to determine follower status");
    };

    
}