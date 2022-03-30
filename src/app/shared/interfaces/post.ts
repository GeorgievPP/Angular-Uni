export interface IPost {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  createdAt: string,
  public: boolean,
  // comment: string[],
  author: string,
  creatorName: string,
  data: string[],
  groupMembers: string[]
}
