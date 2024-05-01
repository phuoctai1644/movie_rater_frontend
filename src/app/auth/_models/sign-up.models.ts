import { SignInPayload } from "./sign-in.models";

export interface SignUpPayload extends SignInPayload {
  email: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserPayload {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
