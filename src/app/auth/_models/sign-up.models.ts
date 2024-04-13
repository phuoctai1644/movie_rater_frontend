import { SignInPayload } from "./sign-in.models";

export interface SignUpPayload extends SignInPayload {
  email: string;
}

export interface SignUpResponse {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
