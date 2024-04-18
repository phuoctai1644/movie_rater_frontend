import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/_services';
import { MovieDataService } from './_services/movie-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  keyword = '';

  constructor(
    private authService: AuthService,
    private movieDataService: MovieDataService
  ) { }

  onSignOut() {
    this.authService.signOut();
  }

  onSearch(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }
    this.movieDataService.keyword.next(this.keyword);
    this.searchInput.nativeElement.blur();
  }
}
