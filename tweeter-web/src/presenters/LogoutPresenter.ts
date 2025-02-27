import { AuthToken } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { Presenter, View } from "./Presenter";

export interface LogoutView extends View {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
    clearUserInfo: () => void
}


export class LogoutPresenter extends Presenter<LogoutView>{
    private _userService: UserService;

    public constructor(view: LogoutView){
      super(view);
      this._userService = new UserService();
    }

    public get userService() {
      return this._userService;
    }

    public async logOut(authToken: AuthToken | null) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
          await this.userService.logout(authToken!);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        }, "log user out");
      };

}