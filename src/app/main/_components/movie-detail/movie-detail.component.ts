import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Rating, RatingPayload } from '../../_models';
import { MovieService } from '../../_services/movie.service';
import { ToastService } from 'src/app/core/_services';
import { RatingService } from '../../_services/rating.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movie!: Movie;
  ratings: Rating[] = [];
  visible = false;
  form!: FormGroup;

  hoveredIndex!: number;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService: RatingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.createForm();

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

  createForm() {
    this.form = this.formBuilder.group({
      stars: [0, Validators.required],
      description: [[], Validators.required]
    });
  }

  openRatingModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.visible = !this.visible;
  }

  onSelectStar(star: number) {
    this.form.get('stars')?.setValue(star);
  }

  onRating() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue() as RatingPayload;
    this.movieService.rating(this.movieId, payload)
      .subscribe({
        next: response => {
          this.toast.success('Rated successfully!');
          this.visible = false;
          this.getMovie();
          this.getRatings();
        },
        error: error => {
          this.toast.error(error.message);
        }
      })
  }

  getStarCount(num: number) {
    return this.ratings.filter(el => el.stars === num).length;
  }

  getStarPercent(num: number) {
    const count = this.getStarCount(num);
    return (count / this.ratings.length) * 100;
  }
}
