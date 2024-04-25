import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rating } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private http: HttpClient) { }

  get(movieId: number) {
    return this.http.get<Rating[]>(`${environment.apiUrl}/ratings/by_movie/${movieId}`);
  }
}
