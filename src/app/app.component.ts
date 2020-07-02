import {Component, OnInit, OnDestroy} from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  title = 'shopproject';
  authorized$;
  profile$ = this.profileService.profile$;


  ngOnInit(): void {
    this.initApp();
  }
  ngOnDestroy(): void {
    if(this.authService.isAuthorized$) {
      this.authorized$.unsubscribe();
    }
  }

  constructor(private authService: LoginService, private router: Router, private profileService: ProfileService) {

  }

  initApp() {
    this.authorized$ = this.authService.isAuthorized$
      .pipe(
        take(1),
        filter(authorized => !authorized),
        flatMap(() => this.authService.check()[0]),
        filter(propEq('authorized', true)),
        flatMap(() => this.authService.info())
      ).subscribe();
  }
}
