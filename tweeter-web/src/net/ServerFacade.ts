import {
  FollowerStatusRequest,
  FollowerStatusResponse,
  PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    PostStatusRequest,
    Status,
    TweeterRequest,
    TweeterResponse,
    User,
    UserDto,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "https://ssj5phm2q3.execute-api.us-east-1.amazonaws.com/Dev";
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    public async getMore(
        request: PagedUserItemRequest,
        endpoint: string,
        errorMessage: string
      ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
          PagedUserItemRequest,
          PagedUserItemResponse
        >(request, endpoint);
    
        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
          response.success && response.items
            ? response.items.map((dto) => User.fromDto(dto) as User)
            : null;
    
        // Handle errors    
        if (response.success) {
          if (items == null) {
            throw new Error(errorMessage);
          } else {
            return [items, response.hasMore];
          }
        } else {
          console.error(response);
          throw new Error(response.message ?? "An unknown error occured.");
        }
      }

    public async getMoreStatus(
      request: PagedStatusItemRequest,
      endpoint: string,
      errorMessage: string
    ): Promise<[Status[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedStatusItemRequest,
        PagedStatusItemResponse
      >(request, endpoint);
  
      // Convert the StatusDto array returned by ClientCommunicator to a User array
      const items: Status[] | null =
        response.success && response.items
          ? response.items.map((dto) => Status.fromDto(dto) as Status)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(errorMessage);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occured.");
      }
    }

    public async postStatus(
      request: PostStatusRequest,
      endpoint: string,
      errorMessage: string
    ): Promise<void> {

      const response = await this.clientCommunicator.doPost<PostStatusRequest, TweeterResponse>(
        request,
        endpoint
      );

      if (response.success) {
        console.log("Status posted successfully.");
      } else {
        console.error(response);
        throw new Error(response.message ?? errorMessage);
      }
    }

    public async followerStatus(
      request: FollowerStatusRequest,
      endpoint: string,
      errorMessage: string
    ): Promise<boolean> {

      const response = await this.clientCommunicator.doPost<FollowerStatusRequest,FollowerStatusResponse>(
        request,
        endpoint
      )

      if (response.success) {
        console.log("Follower status received successfully.");
        return response.isFollower;
      } else {
        throw new Error(response.message ?? errorMessage);
      }
    }

    public async logout(
      request: TweeterRequest,
      endpoint: string,
      errorMessage: string
    ): Promise<void> {

      const response = await this.clientCommunicator.doPost<TweeterRequest, TweeterResponse>(
        request,
        endpoint
      )

      if (response.success) {
        console.log("Status posted successfully.");
      } else {
        console.error(response);
        throw new Error(response.message ?? errorMessage);
      }
    }
  }