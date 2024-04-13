import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigInResponse, SignInPayload } from "../_models";
import { SignUpPayload } from "../_models/sign-up.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  signIn(payload: SignInPayload) {
    return this.http.post<SigInResponse>(`${this.baseUrl}/auth/`, payload);
  }

  signUp(payload: SignUpPayload) {
    return this.http.post<SignUpPayload>(`${this.baseUrl}/api/user/`, payload);
  }
}
