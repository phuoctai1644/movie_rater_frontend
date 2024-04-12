import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigInResponse, SignInPayload } from "../_models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  signIn(payload: SignInPayload) {
    return this.http.post<SigInResponse>(`${this.baseUrl}/auth/`, payload);
  }
}
