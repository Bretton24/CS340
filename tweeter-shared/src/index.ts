//Domain Classes
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

//DTO
export type { UserDto } from "./model/dto/UserDto";
export type { StatusDto } from "./model/dto/StatusDto";
export type { AuthTokenDto } from "./model/dto/AuthTokenDto"

//Requests
export type { TweeterRequest } from "./model/net/request/TweeterRequest";
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { PagedStatusItemRequest } from "./model/net/request/PagedStatusItemRequest";
export type { PostStatusRequest } from "./model/net/request/PostStatusRequest";
export type { FollowerStatusRequest } from "./model/net/request/FollowerStatusRequest";
export type { GetUserRequest } from "./model/net/request/GetUserRequest";
export type { RegisterRequest } from "./model/net/request/RegisterRequest"
export type { LogoutRequest} from "./model/net/request/LogoutRequest"
export type { LoginRequest } from "./model/net/request/LoginRequest"

//Responses
export type { TweeterResponse } from "./model/net/response/TweeterResponse";
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { PagedStatusItemResponse } from "./model/net/response/PagedStatusItemResponse";
export type { FollowerStatusResponse } from "./model/net/response/FollowerStatusResponse";
export type { GetUserResponse } from "./model/net/response/GetUserResponse"
export type { RegisterOrLoginResponse } from "./model/net/response/RegisterOrLoginResponse"

// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.
export { FakeData } from "./util/FakeData";
