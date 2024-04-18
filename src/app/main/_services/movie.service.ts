import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse, Movie, Rating, RatingPayload } from '../_models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  token = this.cookieService.get('accessToken');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${this.token}`,
  })
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAll(keyword: string = '') {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies/?search=${keyword}`, { headers: this.headers});
  }

  get(movieId: number) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${movieId}`, { headers: this.headers});
  }

  rating(movieId: number, payload: RatingPayload) {
    return this.http.post<ApiResponse<Rating>>(
      `${environment.apiUrl}/movies/${movieId}/rate_movie/`,
      payload,
      { headers: this.headers }
    );
  }
}
