import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../core/_services';
import { AuthService, UserService } from '../auth/_services';
import { MovieDataService } from './_services/movie-data.service';
import { UserDropdowns } from './_consts/profile';
import { User, UserDropdownType } from './_models';
import { PasswordValidator } from '../core/_validators';
import { ChangePasswordPayload } from '../auth/_models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  loggedUser!: User;
  keyword = '';
  dropdownItems = UserDropdowns;
  changePasswordVisibility = false;
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private movieDataService: MovieDataService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.createForm();
  }

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

  createForm() {
    this.form = this.formBuilder.group(
      {
        currentPassword: [, [Validators.required]],
        password: [, [Validators.required]],
        confirmPassword: [, [Validators.required]]
      },
      { 
        validators: PasswordValidator.matching()
      }
    );
  }

  onClickUserDropdown(item: any) {
    switch(item.type) {
      case UserDropdownType.INFO:
        this.router.navigate(['profile']);
        break;
      case UserDropdownType.CHANGE_PASSWORD:
        this.changePasswordVisibility = true;
        this.createForm();
        break;
      case UserDropdownType.THEME:
        break;
      default:
    }
  }

  onChangePassword() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const payload: ChangePasswordPayload = {
      currentPassword: rawValue.currentPassword,
      newPassword: rawValue.password
    };
    this.userService.changePassword(this.loggedUser.id, payload)
      .subscribe({
        next: response => {
          this.toast.success('Changed password successfully!');
          this.changePasswordVisibility = false;
        },
        error: data => {
          this.toast.error(data.error?.message);
        }
      })
  }
}
