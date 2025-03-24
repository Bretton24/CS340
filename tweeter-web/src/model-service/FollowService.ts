import { AuthToken, User, FakeData, PagedUserItemRequest, UserDto } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";
import { Service } from "./Service";

export class FollowService extends Service {
    public async loadMore (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null,
        isFollowerLoader: boolean
        ): Promise<[User[], boolean]> {
        const lastItemDto: UserDto | null = lastItem ? lastItem.dto : null;
        const request: PagedUserItemRequest = {
          token: authToken.token,
          userAlias: userAlias,
          pageSize: pageSize,
          lastItem: lastItemDto
        }
        if(isFollowerLoader){
          return await this.serverFacade.getMore(request,"/follower/list",`No followers found`); 
        }
        else {
          return await this.serverFacade.getMore(request,"/followee/list",`No followees found`);
        }
    };

}
