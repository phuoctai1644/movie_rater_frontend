export interface SignInPayload {
  username: string;
  password: string;
}

export interface SigInResponse {
  token: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
