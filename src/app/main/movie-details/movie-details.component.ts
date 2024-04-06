import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../_models';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie?: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
