import { Component, OnInit } from '@angular/core';
import { MovieService } from './_services/movie.service';
import { Movie } from './_models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie!: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAll().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSelectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }
}
