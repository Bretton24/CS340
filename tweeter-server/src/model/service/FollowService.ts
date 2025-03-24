import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";

export class FollowService {    
    public async loadMore (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
        ): Promise<[UserDto[], boolean]> {
        // TODO: Replace with the result of calling server
        return this.getFakeData(lastItem, pageSize, userAlias);
    };

  private async getFakeData(lastItem: UserDto | null, pageSize: number, userAlias: string): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastItem), pageSize, userAlias);
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }



}
