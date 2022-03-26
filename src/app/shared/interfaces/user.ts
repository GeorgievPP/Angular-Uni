export interface IUser {
  _id: string;
  fullName: string,
  email: string,
  password: string,
  ownProjects: string[],
  otherProjects: string[],
}
