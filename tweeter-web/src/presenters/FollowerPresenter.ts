import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FollowerPresenter extends UserItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
          return this.service.loadMore(authToken, userAlias, PAGE_SIZE, this.lastItem, true);
    }
    
    protected getItemDescription(): string {
      return "load followers";
    }
}