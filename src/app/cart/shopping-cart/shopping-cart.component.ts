import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../shopping-cart.service";
import { ProfileService, UserProfile } from "../../profile.service";
import { combineLatest, BehaviorSubject, Observable, of, Subject } from "rxjs";
import {
    delay,
    filter,
    flatMap,
    pluck,
    scan,
    startWith,
    take,
    tap,
    takeUntil,
} from "rxjs/operators";
import { CardInterface } from "../../shared/cards/card-interface";
import { CardServiceService } from "../../card-service.service";

@Component({
    selector: "app-shopping-cart",
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
    cardsList$: Observable<CardInterface[]>;
    cards;
    cartLenght;
    refresh$ = new Subject() as Subject<CardInterface>;
    destroy$ = new Subject<void>();

    constructor(
        private orderService: ShoppingCartService,
        private profileService: ProfileService,
        private cardService: CardServiceService
    ) {}

    isLogged() {
        if (!localStorage.getItem("token")) {
            return false;
        } else {
            return true;
        }
    }

    ngOnInit(): void {
        this.initCart();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initCart() {
        // profile$ -> null ??
        this.cardsList$ = this.refresh$
            .asObservable()
            .pipe(startWith(null))
            .pipe(take(1))
            .pipe(flatMap(() => this.profileService.profile$))
            .pipe(pluck("cart"))
            .pipe(
                filter((cart) => {
                    this.cartLenght = cart.length;
                    return cart.length !== 0;
                })
            )
            .pipe(
                flatMap((ids: string[]) =>
                    combineLatest(
                        ids.map((id) => this.cardService.getSingleCard(id))
                    )
                )
            );
    }

    deleteOrderFromCart(id: string) {
        return this.orderService
            .deleteOrdersFromCartByPatch({ cart: [id] })
            .pipe(takeUntil(this.destroy$))
            .subscribe(()=> this.ngOnInit());
    }
}
