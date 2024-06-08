import { createActionGroup, props } from "@ngrx/store";
import { SignInPayload } from "src/app/auth/_models";
import { User } from "src/app/main/_models";

export const SignInActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign In': props<{payload: SignInPayload}>(),
    'Sign In Success': props<any>(),
    'Sign In Failed': props<{error: any}>()
  }
});

export const GetProfileActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get Success': props<{user: User}>(),
    'Get Failed': props<{error: any}>()
  }
});
