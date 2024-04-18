import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../_models';
import { MovieService } from '../../_services/movie.service';
import { ToastService } from 'src/app/core/_services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  get embedUrl() {
    const trailer_obj = new URL(this.movie.trailer_url as string);
    const params = trailer_obj.searchParams;
    const videoId = params.get('v');
    const hostName = trailer_obj.host;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://${hostName}/embed/${videoId}`);
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.getMovie(movieId);
  }

  getMovie(id: number) {
    this.movieService.get(id).subscribe({
      next: movie => {
        this.movie = movie
      },
      error: error => {
        this.toast.error(error.message);
      }
    })
  }
}
