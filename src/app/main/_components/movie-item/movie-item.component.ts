import { Component, Input } from '@angular/core';
import { Movie } from '../../_models';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  @Input() movie!: Movie;
}
