import { Component, Input } from '@angular/core';
import { Movie } from '../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) { }

  onViewDetail() {
    this.router.navigate([`/movies/${this.movie.id}`]);
  }
}
