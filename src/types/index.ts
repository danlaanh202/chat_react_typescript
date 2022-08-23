export interface ILoginUser {
  username: String;
  password: String;
  email?: String | undefined;
  _id?: String;
}
export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  accessToken?: string;
  _id: string;
}
export interface IRoom {
  _id?: string;
  users: string[];
  isPrivate: boolean;
  room_name: string;
  room_host: string;
  updated_at?: Date;
}
export type TRoom = IRoom[];

export interface IMessage {
  _id?: string;
  created_at?: Date;
  message?: string;
  room?: string;
  user?: string;
}
export interface ISignupUser extends ILoginUser {
  confirmPassword?: string;
}
