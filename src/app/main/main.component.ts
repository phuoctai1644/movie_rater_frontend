import { Component } from '@angular/core';
import { AuthService } from '../auth/_services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  keyword = '';

  constructor(
    private authService: AuthService
  ) { }

  onSignOut() {
    this.authService.signOut();
  }
}
