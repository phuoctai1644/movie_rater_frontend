import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token a5d9b0dcb4fa751eb5f7ea17cfa4fcd4a339b697`,
  })
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies/`, { headers: this.headers});
  }
}
