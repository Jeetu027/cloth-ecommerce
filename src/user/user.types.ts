export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  contact_no?: string;
  role: UserRole;
  profile_img?: string;
}
export interface UsersTypeUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  created_at?: Date;
  contact_no?: string;
  profile_img?: string;
}
