import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {ProfileService} from '../profile.service';
import {Router} from '@angular/router';
import {flatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  validateForm!: FormGroup;
  profile$ = this.profileService.profileSubject;

  isLogged() {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.authService.logout();
  }

  submitForm(): void {
    const [success$, error$] = this.authService.login(this.validateForm.getRawValue());
    success$.pipe(flatMap(() => this.authService.info()[0])).subscribe();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,
              private authService: LoginService,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
