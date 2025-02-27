import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model-service/StatusService";
import { Presenter, View } from "./Presenter";

export interface PostStatusView extends View {
    clearPost: (event: React.MouseEvent) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
    private isLoading = false;
    private _statusService: StatusService;

    public constructor(view: PostStatusView) {
      super(view)
      this._statusService = new StatusService();
    }

    public get statusService () {
      return this._statusService;
    }

    public async submitPost(event: React.MouseEvent, post: string, currentUser: User | null, authToken: AuthToken) {
        event.preventDefault();
        this.doFailureReportingOperation(async () => {
          this.isLoading = true;
          this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.statusService.postStatus(authToken, status);
    
          this.view.clearPost(event);
          this.view.displayInfoMessage("Status posted!", 2000);
        }, "post the status");
        this.view.clearLastInfoMessage();
        this.isLoading = false;
      };
}