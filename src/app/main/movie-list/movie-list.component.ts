import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../_models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Output() selectMovie = new EventEmitter<Movie>();

  onSelectMovie(movie: Movie) {
    this.selectMovie.emit(movie);
  }
}
