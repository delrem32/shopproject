import {Component, OnChanges, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../profile.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  validateForm!: FormGroup;
  @ViewChild('templateNot') templateNot: TemplateRef<{}>;
  profile = this.profileService.profileSubject.value;
  notif;

  submitForm(): void {
    this.profileService.updateProfile(this.validateForm.getRawValue()).subscribe(() => this.createBasicNotification());
  }

  createBasicNotification(): void {
    this.notification.template(this.templateNot);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumberPrefix: ['+49'],
      phoneNumber: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      address: [null, [Validators.required]],
      agree: [false]
    });
    this.setFormValue();
  }

  setFormValue() {
    this.validateForm.patchValue(this.profile);
  }
}
