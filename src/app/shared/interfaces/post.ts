import { IUser } from "./user";

export interface IPost {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  createdAt: string,
  public: boolean,
  // comment: string[],
  author: IUser,
  creatorName: string,
  data: string[],
  groupMembers: IUser[]
}
