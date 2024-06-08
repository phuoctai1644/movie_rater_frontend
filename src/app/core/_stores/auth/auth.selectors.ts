import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducers";

export const selectAuth = createFeatureSelector<AuthState>(authFeatureKey);

export const selectLoggedUser = createSelector(
  selectAuth,
  (state: AuthState) => state.loggedUser
);
