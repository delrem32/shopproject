import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {filter, map, flatMap, take} from 'rxjs/operators';
import { propEq } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate, CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isAuthorized$
    .pipe(
      filter((state) => state !== null),
      map((authStatus) => authStatus ? authStatus : this.router.createUrlTree(['/']))
    );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized$
      .pipe(
        filter((state) => state !== null),
        map((authStatus) => authStatus ? authStatus : this.router.createUrlTree(['/'])),
      );
  }

  constructor(private authService: LoginService, private router: Router) {
  }
}
