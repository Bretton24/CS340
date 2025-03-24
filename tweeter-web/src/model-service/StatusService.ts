import { AuthToken, FakeData, PagedStatusItemRequest, PostStatusRequest, Status, StatusDto } from "tweeter-shared";
import { Service } from "./Service";

export class StatusService extends Service {

    public async loadMore (
            authToken: AuthToken,
            userAlias: string,
            pageSize: number,
            lastItem: Status | null,
            isStoryLoader: boolean
          ): Promise<[Status[], boolean]> {
            const lastItemDto: StatusDto | null = lastItem ? lastItem.dto : null;
            const request: PagedStatusItemRequest = {
              token: authToken.token,
              userAlias: userAlias,
              pageSize: pageSize,
              lastItem: lastItemDto
            }
            if(isStoryLoader){
              return await this.serverFacade.getMoreStatus(request,"/story/list",`No story items found`); 
            }
            else {
              return await this.serverFacade.getMoreStatus(request,"/feed/list",`No feed items found`);
            }
          };

    public async postStatus(authToken: AuthToken, newStatus: Status): Promise<void>{
      // Pause so we can see the logging out message. Remove when connected to the server
      await new Promise((f) => setTimeout(f, 2000));
      const newStatusDto: StatusDto = newStatus.dto;
      const request: PostStatusRequest = {
        token: authToken.token,
        newStatus: newStatusDto
      }
      this.serverFacade.postStatus(request,"/poststatus/list","Status not posted");
    };

    
    
}