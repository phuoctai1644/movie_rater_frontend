import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ChangePasswordPayload, SigInResponse, SignInPayload } from "../_models";
import { SignUpPayload, User, UserPayload } from "../_models/sign-up.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  signIn(payload: SignInPayload) {
    return this.http.post<SigInResponse>(`${this.baseUrl}/auth/`, payload);
  }

  signUp(payload: SignUpPayload) {
    return this.http.post<User>(`${this.baseUrl}/api/users/`, payload);
  }

  signOut() {
    this.cookieService.delete('accessToken');
    this.router.navigate(['/auth/sign-in']);
  }

  getProfile() {
    return this.http.get<User>(`${this.baseUrl}/api/users/profile`);
  }

  updateProfile(id: number, payload: UserPayload) {
    return this.http.put<User>(`${this.baseUrl}/api/users/${id}/`, payload);
  }

  changePassword(id: number, payload: ChangePasswordPayload) {
    return this.http.post<any>(`${this.baseUrl}/api/users/${id}/change_password/`, payload);
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

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('userProfile') || '');
  }
}
