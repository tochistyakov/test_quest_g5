import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { map, take, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.getUser().pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['/signIn']);
        return false;
      }
    })
  );

  
}