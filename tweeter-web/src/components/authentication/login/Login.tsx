import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import { UserInfoContext } from "../../userInfo/UserInfoProvider";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "../../toaster/ToastListenerHook";
import InputFields from "../AuthenticationFields";
import AuthenticationFields from "../AuthenticationFields";
import { LoginPresenter } from "../../../presenters/LoginPresenter";
import { AuthenticationView } from "../../../presenters/AuthenticationPresenter";

interface Props {
  originalUrl?: string;
  presenter?: LoginPresenter
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { updateUserInfo } = useContext(UserInfoContext);
  const { displayErrorMessage } = useToastListener();

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      doLogin();
    }
  };

  const listener: AuthenticationView = {
    displayErrorMessage: displayErrorMessage,
    updateUserInfo: updateUserInfo,
  };

  const [presenter] = useState(props.presenter ?? new LoginPresenter(listener));

  const doLogin = () =>
    presenter.doLogin(alias, password, rememberMe, navigate, props.originalUrl);

  const inputFieldGenerator = () => {
    return (
      <AuthenticationFields
        alias={alias}
        password={password}
        setAlias={setAlias}
        setPassword={setPassword}
        onEnterPress={loginOnEnter}
      />
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
