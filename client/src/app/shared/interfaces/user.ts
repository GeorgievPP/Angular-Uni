import { IPost } from "./post";

export interface IUser {
  _id: string;
  fullName: string,
  email: string,
  password: string,
  ownProjects: string[],
  otherProjects: IPost[],
  like: boolean,
  token: string
}
