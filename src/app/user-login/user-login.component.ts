import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
import { ProfileService } from "../profile.service";
import { Router } from "@angular/router";
import { filter, flatMap, pluck, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-user-login",
    templateUrl: "./user-login.component.html",
    styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
    validateForm!: FormGroup;
    errorSubject = new BehaviorSubject(null) as BehaviorSubject<string>;
    profile$ = this.profileService.profileSubject;

    isLogged() {
        if (!localStorage.getItem("token")) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        this.authService.logout();
    }

    submitForm(): void {
        const [success$, error$] = this.authService.login(
            this.validateForm.getRawValue()
        );
        success$.pipe(flatMap(() => this.authService.info()[0])).subscribe();
        error$
            .pipe(pluck("error", "message"))
            .pipe(filter((message) => typeof message === "string"))
            .pipe(
                tap((message: string) => {
                    this.errorSubject.next(message);
                    this.validateForm
                        .get("email")
                        .setErrors({ incorrect: true });
                    return this.validateForm.get("password").reset("");
                })
            )
            .subscribe();
    }

    constructor(
        private fb: FormBuilder,
        private authService: LoginService,
        private profileService: ProfileService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        });
    }
}
