import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/auth/_services";
import { GetProfileActions, SignInActions } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../../_services";

const signIn = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(SignInActions.signIn),
      exhaustMap(props =>
        authService.signIn(props.payload).pipe(
          map(response => {
            authService.setAccessToken(response.token);
            return SignInActions.signInSuccess()
          }),
          catchError(error => of(SignInActions.signInFailed(error)))
        )
      )
    )
  },
  { functional: true }
);

const signInSuccess = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return action$.pipe(
      ofType(SignInActions.signInSuccess),
      exhaustMap(props => {
        return authService.getProfile().pipe(
          map(user => {
            router.navigate(['']);
            return GetProfileActions.getSuccess({ user });
          }),
          catchError(error => of(GetProfileActions.getFailed({ error })))
        );
      })
    )
  },
  { functional: true }
);

const signInFailed = createEffect(
  (action$ = inject(Actions), toast = inject(ToastService)) => {
    return action$.pipe(
      ofType(SignInActions.signInFailed),
      tap((error: any) => {
        toast.error(error.message);
      })
    )
  },
  { functional: true, dispatch: false }
);

const getProfileFailed = createEffect(
  (action$ = inject(Actions), toast = inject(ToastService)) => {
    return action$.pipe(
      ofType(GetProfileActions.getFailed),
      tap((error: any) => {
        toast.error(error.message)
      })
    )
  },
  { functional: true, dispatch: false }
);

export {
  signIn,
  signInFailed,
  signInSuccess,
  getProfileFailed,
}
