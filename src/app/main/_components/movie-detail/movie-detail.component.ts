import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Rating } from '../../_models';
import { MovieService } from '../../_services/movie.service';
import { ToastService } from 'src/app/core/_services';
import { DomSanitizer } from '@angular/platform-browser';
import { RatingService } from '../../_services/rating.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movie!: Movie;
  ratings: Rating[] = [];

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private ratingService: RatingService
  ) { }

  get embedUrl() {
    const trailer_obj = new URL(this.movie.trailer_url as string);
    const params = trailer_obj.searchParams;
    const videoId = params.get('v');
    const hostName = trailer_obj.host;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://${hostName}/embed/${videoId}`);
  }

  get avgRating() {
    return Number(this.movie.avg_rating).toFixed(1);
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];

    if (this.movieId) {
      this.getMovie();
      this.getRatings();
    }
  }

  getMovie() {
    this.movieService.get(this.movieId).subscribe({
      next: movie => {
        this.movie = movie
      },
      error: error => {
        this.toast.error(error.message);
      }
    })
  }

  getRatings() {
    this.ratingService.get(this.movieId).subscribe({
      next: ratings => {
        this.ratings = ratings;
      },
      error: error => {
        this.toast.error(error.message);
      }
    })
  }
}
