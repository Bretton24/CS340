import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import {render, screen} from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenters/LoginPresenter";
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

library.add(fab);

describe("Login Component", () => {
    it("starts with the sign in button disabled", () => {
        const {signInButton} = renderLoginAndGetElements("/");
        expect(signInButton).toBeDisabled();
    })

    it("enables sign in button if both alias and passwords fields are filled with text", async () => {
        const {signInButton, aliasField, passwordField, user} = renderLoginAndGetElements("/");

        await user.type(aliasField, "a");
        await user.type(passwordField, "b");

        expect(signInButton).toBeEnabled();
    })

    it("The sign-in button is disabled if either the alias or password field is cleared", async() => {
        const {signInButton, aliasField, passwordField, user} = renderLoginAndGetElements("/");

        await user.type(aliasField, "a");
        await user.type(passwordField, "b");

        expect(signInButton).toBeEnabled();

        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, "ddu");

        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();
    })

    it("The presenter's login method is called with correct parameters when the sign-in button is pressed.", async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);
        
        const originalUrl = "https://someurl.com";
        const alias = "@somealias";
        const password = "some";
        const rememberMe = false; 

        const {signInButton, aliasField, passwordField, user } = renderLoginAndGetElements(originalUrl,mockPresenterInstance);
        await user.type(aliasField, alias);
        await user.type(passwordField, password);

        await user.click(signInButton);

        verify(mockPresenter.doLogin(alias,password,rememberMe,mockNavigate,originalUrl)).once();
    })
})

const renderLogin = (originalUrl: string, presenter?:LoginPresenter) => {
    return render(
    <MemoryRouter>
        {!!presenter? (<Login originalUrl={originalUrl} presenter={presenter}/>) : (<Login originalUrl={originalUrl}/>)}
    </MemoryRouter>);
}

const renderLoginAndGetElements = (originalUrl: string, presenter?:LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole("button", { name: /Sign in/i});
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    return { signInButton, aliasField, passwordField, user }
}