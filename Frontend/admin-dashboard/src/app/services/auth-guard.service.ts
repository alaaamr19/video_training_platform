// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.auth.getToken()) {
      // This is the injected auth service which depends on what you are using
      return true;
    }

    console.log('access denied!');
    this.router.navigate(['/login']);
    return false;
  }
}