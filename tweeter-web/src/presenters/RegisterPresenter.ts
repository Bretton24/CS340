import { Buffer } from "buffer";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";
import { NavigateFunction } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";

export interface RegisterView extends AuthenticationView {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
  public constructor(view: RegisterView) {
    super(view);
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    userAlias: string,
    password: string,
    rememberMe: boolean,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    navigate: NavigateFunction
  ) {
    this.authenticate(
      () =>
        this.userService.register(
          firstName,
          lastName,
          userAlias,
          password,
          imageBytes,
          imageFileExtension
        ),
      rememberMe,
      "register user",
      navigate
    );
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.view.setImageFileExtension(fileExtension);
      }
    } else {
      this.view.setImageUrl("");
      this.view.setImageBytes(new Uint8Array());
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }
}
