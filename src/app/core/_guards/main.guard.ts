import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/auth/_services';
import { AuthState, GetProfileActions } from '../_stores/auth';
import { catchError, map, of } from 'rxjs';

export const mainGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const store = inject(Store<AuthState>);

  return userService.getProfile().pipe(
    map(user => {
      store.dispatch(GetProfileActions.getSuccess({ user }));
      return true;
    }),
    catchError(error => of(false))
  )
};
