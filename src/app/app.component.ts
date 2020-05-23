import {Component} from '@angular/core';
import {LoginService} from './login.service';
import {filter, flatMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {propEq} from 'ramda';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopproject';
  authorized$ = this.authService.isAuthorized$;
  profile$ = this.profileService.profile$;
  constructor(private authService: LoginService, private router: Router, private profileService: ProfileService) {
    this.initApp();
  }

  initApp() {
    this.authService.isAuthorized$
      .pipe(
        take(1),
        filter(authorized => !authorized),
        flatMap(() => this.authService.check()[0]),
        filter(propEq('authorized', true)),
        flatMap(() => this.authService.info()),
        flatMap(() => this.router.navigate(['/']))
      ).subscribe();
  }
}
