import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigInResponse, SignInPayload } from "../_models";
import { SignUpPayload, User } from "../_models/sign-up.models";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  signIn(payload: SignInPayload) {
    return this.http.post<SigInResponse>(`${this.baseUrl}/auth/`, payload);
  }

  signUp(payload: SignUpPayload) {
    return this.http.post<User>(`${this.baseUrl}/api/users/`, payload);
  }

  signOut() {
    this.cookieService.delete('accessToken');
  }

  isAuthenticated() {
    return this.getAccessToken() ? true : false;
  }

  getAccessToken() {
    return this.cookieService.get('accessToken');
  }

  setAccessToken(token: string) {
    return this.cookieService.set('accessToken', token);
  }
}
