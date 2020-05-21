import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {LoginService} from '../login.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, filter, pluck, share, tap} from 'rxjs/operators';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  validateForm: FormGroup;
  errorSubject = new BehaviorSubject(null) as BehaviorSubject<string>;

  ngOnInit(): void {
  }

  submitForm(): void {
    /*const {email, password} = this.validateForm.get('email').value;
    const password = this.validateForm.get('password').value;
    */
    this.errorSubject.next(null);
    const {email, password} = this.validateForm.getRawValue();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    const [success$, error$] = this.authService.register({email, password});
    success$.pipe(tap(() => this.router.navigate(['home'])),
      tap(() => {
        return this.errorSubject.next(null);
      })).subscribe();
    error$.pipe(share()).pipe(pluck('error', 'message'))
      .pipe(filter((message) => typeof message === 'string'))
      .pipe(tap((message: string) => {
        this.errorSubject.next(message);
        return this.validateForm.get('email').setErrors({'incorrect': true});
      })).subscribe();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  constructor(private fb: FormBuilder, private authService: LoginService, private http: HttpClient,
              private router: Router) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
}
