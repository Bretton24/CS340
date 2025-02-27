import { NavigateFunction } from "react-router-dom";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
  public async doLogin(
    userAlias: string,
    password: string,
    rememberMe: boolean,
    navigate: NavigateFunction,
    originalUrl?: string
  ) {
    this.authenticate(
      () => this.userService.login(userAlias, password),
      rememberMe,
      "log user in",
      navigate,
      originalUrl
    );
  }
}
