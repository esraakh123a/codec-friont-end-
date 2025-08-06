import { CanActivateFn } from '@angular/router';

export const studentGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
