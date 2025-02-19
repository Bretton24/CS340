import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model-service/StatusService";

export interface PostStatusView {
    post: string
    currentUser: User | null
    authToken: AuthToken
    clearPost: (event: React.MouseEvent) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
}

export class PostStatusPresenter {

    private isLoading = false;
    private statusService: StatusService;
    private view: PostStatusView;

    public constructor(view: PostStatusView) {
      this.view = view;
      this.statusService = new StatusService();
    }

    public async submitPost(event: React.MouseEvent) {
        event.preventDefault();
    
        try {
          this.isLoading = true;
          this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(this.view.post, this.view.currentUser!, Date.now());
    
          await this.statusService.postStatus(this.view.authToken, status);
    
          this.view.clearPost(event);
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.isLoading = false;
        }
      };
}