import { CanActivateFn } from '@angular/router';

export const instructorGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
