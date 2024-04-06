import { Component, Input } from '@angular/core';
import { Movie } from '../_models';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() movie!: Movie;

  faStar = faStar;
  starHovered = 0;

  constructor(private movieService: MovieService) { }

  onStarHovered(star: number) {
    this.starHovered = star;
  }

  onRating(quantity: number) {
    this.movieService.rating(this.movie.id, { stars: quantity })
      .subscribe({
        next: (response) => {
          const updatedMovie = response.data.movie;
          this.movie.total_rating = updatedMovie.total_rating;
          this.movie.avg_rating = updatedMovie.avg_rating;
        },
        error: (error) => console.log(error)
      })
  }
}
