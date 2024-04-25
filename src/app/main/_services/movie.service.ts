import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse, Movie, Rating, RatingPayload } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getAll(keyword: string = '') {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies/?search=${keyword}`);
  }

  get(movieId: number) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${movieId}`);
  }

  rating(movieId: number, payload: RatingPayload) {
    const url = `${environment.apiUrl}/movies/${movieId}/rate_movie/`;
    return this.http.post<ApiResponse<Rating>>(url, payload);
  }
}
