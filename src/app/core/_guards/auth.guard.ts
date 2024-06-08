import { CanActivateFn, Router } from '@angular/router';
import { AppInjector } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/_services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = AppInjector.get(AuthService);
  const router = AppInjector.get(Router);
  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/sign-in']);
  return false;
};
