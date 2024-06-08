import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/main/_models";
import { GetProfileActions, SignInActions } from "./auth.actions";

export const authFeatureKey = 'authentication';

export interface AuthState {
  loggedUser?: User;
  error: any;
}

export const initialAuthState: AuthState = {
  loggedUser: undefined,
  error: undefined
} 

export const authReducer = createReducer(
  initialAuthState,
  on(SignInActions.signInFailed, (state, { error }) => ({...state, error})),
  on(GetProfileActions.getSuccess, (state, { user }) => ({...state, loggedUser: user})),
  on(GetProfileActions.getFailed, (state, { error }) => ({...state, error})),
);
