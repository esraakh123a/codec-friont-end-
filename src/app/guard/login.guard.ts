import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    // لو فيه توكن، معناها إنه عامل لوجن بالفعل
    router.navigate(['/home']);
    return false;
  } else {
    // لو مفيش توكن، مسموح يدخل صفحة اللوجن
    return true;
  }
};
