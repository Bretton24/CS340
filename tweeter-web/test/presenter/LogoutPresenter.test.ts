import { AuthToken } from "tweeter-shared";
import { LogoutPresenter, LogoutView } from "../../src/presenters/LogoutPresenter";
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import { UserService } from "../../src/model-service/UserService";
describe("LogoutPresenter", () => {
    let mockLogoutView: LogoutView;
    let logoutPresenter: LogoutPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockLogoutView = mock<LogoutView>();
        const mockLogoutViewInstance = instance(mockLogoutView);

        const logoutPresenterSpy = spy(new LogoutPresenter(mockLogoutViewInstance))
        logoutPresenter = instance(logoutPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(logoutPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    })
    it("tells the view to display a logging out message", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockLogoutView.displayInfoMessage("Logging Out...", 0)).once();
    })

    it("calls logout on the user service with the correct auth token",async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    })

    it("When the logout is successful, the presenter tells the view to clear the last info message and clear the user info", async () => {
        await logoutPresenter.logOut(authToken);

        verify(mockLogoutView.clearLastInfoMessage()).once();
        verify(mockLogoutView.clearUserInfo()).once();

        verify(mockLogoutView.displayErrorMessage(anything())).never();
    })

    it("When the logout is not successful, the presenter tells the view to display an error message and does not tell it to clear the last info message or clear the user info", async () => {
        const error = new Error("an error occured");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await logoutPresenter.logOut(authToken);

        let [capturedErrorMessage] = capture(mockLogoutView.displayErrorMessage).last();
        console.log(capturedErrorMessage);

        verify(mockLogoutView.displayErrorMessage("Failed to log user out because of exception: an error occured")).once();

        verify(mockLogoutView.clearLastInfoMessage()).never();
        verify(mockLogoutView.clearUserInfo()).never();
    })
});