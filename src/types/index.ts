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
  last_message?: IMessage;
}
export type TRoom = IRoom[];

export interface IMessage {
  _id?: string;
  created_at?: Date;
  message?: string;
  room?: string;
  user?: string | IUser;
  image?: IImage;
}
export interface IImage {
  _id?: string;
  uploader?: string;
  is_message: Boolean;
  is_user_avatar: Boolean;
  room_id: Boolean;
  is_room_avatar: Boolean;
  image_url: string;
}
export interface ISignupUser extends ILoginUser {
  confirmPassword?: string;
}
