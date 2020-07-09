import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { share, tap } from "rxjs/operators";
import { ProfileService, UserProfile } from "./profile.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ShoppingCartService {
    private apiURL = "http://localhost:5000/profiles";
    constructor(
        private http: HttpClient,
        private profileService: ProfileService
    ) {}

    patchOrdersFromCart(payload): Observable<UserProfile> {
        const updateProfile$ = this.http
            .patch<UserProfile>(
                `${this.apiURL}/patch/${
                    this.profileService.profileSubject.getValue()._id
                }`,
                payload
            )
            .pipe(share());
        updateProfile$
            .pipe(
                tap((profileRaw: UserProfile) =>
                    this.profileService.profileSubject.next(profileRaw)
                )
            )
            .subscribe();
        return updateProfile$;
    }
    deleteOrdersFromCartByPatch(payload) {
        const updateProfile$ = this.http
            .patch(
                `${this.apiURL}/delete/${
                    this.profileService.profileSubject.getValue()._id
                }`,
                payload
            )
            .pipe(share());
        updateProfile$
            .pipe(
                tap((profileRaw: UserProfile) =>
                    this.profileService.profileSubject.next(profileRaw)
                )
            )
            .subscribe();
        return updateProfile$;
    }
}
