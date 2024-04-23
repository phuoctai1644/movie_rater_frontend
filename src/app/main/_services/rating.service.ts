import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rating } from '../_models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  token = this.cookieService.get('accessToken');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${this.token}`,
  })
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  get(movieId: number) {
    return this.http.get<Rating[]>(`${environment.apiUrl}/ratings/by_movie/${movieId}`, { headers: this.headers });
  }
}
