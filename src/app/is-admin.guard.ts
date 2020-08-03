import { Injectable, OnDestroy } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { ProfileService } from "./profile.service";
import { pluck, tap, filter, takeUntil } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class IsAdminGuard implements CanActivate, OnDestroy {
    admin = false;
    destroy$ = new Subject<void>();
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        this.profileService.profile$
            .pipe(
                filter(
                    (userProfile) =>
                        userProfile !== undefined && userProfile !== null
                ),
                pluck("role"),
                tap((role) => {
                    if (role === "admin") {
                        return (this.admin = true);
                    } else {
                        return (this.admin = false);
                    }
                })
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        return this.admin;
    }
    constructor(private profileService: ProfileService) {}
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
