import { AuthTokenDto } from "../../dto/AuthTokenDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface RegisterOrLoginResponse extends TweeterResponse {
  readonly user: UserDto;
  readonly authToken: AuthTokenDto;
}
