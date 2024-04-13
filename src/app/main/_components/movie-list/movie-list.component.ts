import { Component } from '@angular/core';
import { MovieService } from '../../_services/movie.service';
import { Movie } from '../../_models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  topMovie: Movie[] = [];
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService
  ) { }
}
