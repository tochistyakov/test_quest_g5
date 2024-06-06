import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { map, take } from 'rxjs';

export const UnAuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const router = inject(Router)
  
  return authService.getUser().pipe(
    take(1),
    map(user => {
      if (user) {
        router.navigate(['/signIn']);
        return false;
        } else {
        return true;
      }
    })
  );
}