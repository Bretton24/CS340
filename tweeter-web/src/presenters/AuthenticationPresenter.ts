import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { NavigateFunction } from "react-router-dom";
import { UserService } from "../model-service/UserService";

export interface AuthenticationView extends View {
  updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
      ) => void;
}

export abstract class AuthenticationPresenter<V extends AuthenticationView> extends Presenter<V> {
  protected _isLoading: boolean;
  protected userService: UserService;

  public constructor(view: V) {
    super(view);
    this._isLoading = false;
    this.userService = new UserService();
  }

  public get isLoading() {
    return this._isLoading;
  }

  protected async authenticate(
    authFunction: () => Promise<[User, AuthToken]>,
    rememberMe: boolean,
    errorMessage: string,
    navigate: NavigateFunction,
    originalUrl?: string
  ) {
    await this.doFailureReportingOperation(async () => {
      this._isLoading = true;

      const [user, authToken] = await authFunction();

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (errorMessage === "log user in") {
        if (!!originalUrl) {
          navigate(originalUrl);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }

      this._isLoading = false;
    }, errorMessage);
  }

}

 

  
