import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model-service/UserService";
import { useNavigate } from "react-router-dom";

export interface RegisterView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
}

export class RegisterPresenter {
    private isLoading = false;
    private userService: UserService;
    private view: RegisterView;
    public navigate = useNavigate();

    public constructor(view: RegisterView){
        this.userService = new UserService();
        this.view = view;
    }

    public async doRegister(firstName: string, lastName: string, userAlias: string, password: string, rememberMe: boolean, imageBytes: Uint8Array, imageFileExtension: string ){
        
        try {
          this.isLoading = true;
    
          const [user, authToken] = await this.userService.register(
            firstName,
            lastName,
            userAlias,
            password,
            imageBytes,
            imageFileExtension
          );
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
          this.navigate("/");
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to register user because of exception: ${error}`
          );
        } finally {
          this.isLoading = false;
        }
      };

}