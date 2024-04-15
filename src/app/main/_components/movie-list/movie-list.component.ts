import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../_services/movie.service';
import { Movie } from '../../_models';
import { ToastService } from 'src/app/core/_services';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  topMovies: Movie[] = [];
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAll().subscribe({
      next: response => {
        this.movies = response;
        this.topMovies = [...response].sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 20);
      },
      error: error => {
        this.toastService.error(error.message);
      }
    })
  }
}
