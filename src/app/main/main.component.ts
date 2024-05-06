import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/_services';
import { MovieDataService } from './_services/movie-data.service';
import { UserDropdowns } from './_consts/profile';
import { UserDropdownType } from './_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  keyword = '';
  dropdownItems = UserDropdowns;
  changePasswordVisibility = false;

  constructor(
    private router: Router,
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

  onClickUserDropdown(item: any) {
    switch(item.type) {
      case UserDropdownType.INFO:
        this.router.navigate(['profile']);
        break;
      case UserDropdownType.CHANGE_PASSWORD:
        this.changePasswordVisibility = true;
        break;
      case UserDropdownType.THEME:
        break;
      default:
    }
  }
}
