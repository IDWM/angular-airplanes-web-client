import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

  if (!authService.isAuthInitialized() || !authService.isAuthenticated()) {
    router.navigate(['/login']);
    toastService.error('Necesitas iniciar sesión para acceder a esta sección');
    return false;
  }

  return true;
};
