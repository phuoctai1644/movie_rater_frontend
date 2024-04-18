import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../_services/movie.service';
import { Movie } from '../../_models';
import { ToastService } from 'src/app/core/_services';
import { MovieDataService } from '../../_services/movie-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  topMovies: Movie[] = [];
  movies: Movie[] = [];
  keyword = '';

  constructor(
    private movieService: MovieService,
    private toastService: ToastService,
    private movieDataService: MovieDataService
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.observeEvent();
  }

  observeEvent() {
    this.movieDataService.keyword.subscribe(keyword => {
      this.keyword = keyword;
      this.getMovies(keyword);
    });
  }

  getMovies(keyword: string = '') {
    this.movieService.getAll(keyword).subscribe({
      next: response => {
        this.movies = response;
        this.topMovies = [...response].sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 5);
      },
      error: error => {
        this.toastService.error(error.message);
      }
    })
  }
}
