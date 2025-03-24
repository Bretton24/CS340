import { AuthToken, Status } from "tweeter-shared";
import { StatusItemPresenter} from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
      return this.service.loadMore(authToken, userAlias, PAGE_SIZE, this.lastItem,true);
    }
    
    protected getItemDescription(): string {
      return "load story items";
    }
}