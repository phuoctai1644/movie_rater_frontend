import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserPayload } from '../_models/sign-up.models';
import { ChangePasswordPayload } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<User>(`${environment.apiUrl}/users/profile`);
  }

  updateProfile(id: number, payload: UserPayload) {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}/`, payload);
  }

  changePassword(id: number, payload: ChangePasswordPayload) {
    return this.http.post<any>(`${environment.apiUrl}/users/${id}/change_password/`, payload);
  }

  changeAvatar(payload: { avatar: File }, id: number) {
    const formData = new FormData();
    formData.append('avatar', payload.avatar);
    return this.http.put(`${environment.apiUrl}/users/${id}/change_avatar/`, formData);
  }
}
