import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { useNavigate } from "react-router-dom";

export interface LoginView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
}

export class LoginPresenter {
    private _isLoading = false;
    private userService: UserService;
    private _view: LoginView;
    public navigate = useNavigate();
    
    public constructor(view: LoginView){
        this.userService = new UserService();
        this._view = view;
    }

    public get view(){
      return this._view;
    }

    public get isLoading() {
      return this._isLoading;
    }

    public async doLogin(userAlias: string, password: string, rememberMe: boolean, originalUrl?: string) {
        
        try {
          this._isLoading = true;
    
          const [user, authToken] = await this.userService.login(userAlias, password);
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
    
          if (!!originalUrl) {
            this.navigate(originalUrl);
          } else {
            this.navigate("/");
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user in because of exception: ${error}`
          );
        } finally {
          this._isLoading = false;
        }
      };
}