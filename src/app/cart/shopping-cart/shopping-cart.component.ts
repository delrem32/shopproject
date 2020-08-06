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
    switchMap,
    debounceTime,
} from "rxjs/operators";
import { CardInterface } from "../../shared/cards/card-interface";
import { CardServiceService } from "../../card-service.service";
import { OrderService } from "../../order.service";
import { OrderInterface } from "../../shared/orders/order-interface";

@Component({
    selector: "app-shopping-cart",
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
    cardsList$: Observable<CardInterface[]>;
    cards;

    refresh$ = new Subject() as Subject<CardInterface>;
    destroy$ = new Subject<void>();
    badgeCount;
    visible = false;
    data = [];

    profile$ = this.profileService.profile$;
    deliveryAdress$;
    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }
    constructor(
        private orderService: OrderService,
        private cartService: ShoppingCartService,
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
        this.deliveryAdress$ = this.profile$.pipe(pluck("address"));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initCart() {
        this.cardsList$ = this.refresh$
            .asObservable()
            .pipe(startWith(null))
            .pipe(
                take(1),
                flatMap(() => this.profileService.profile$),
                pluck("cart"),
                filter((cart) => {
                    return cart.length !== 0;
                }),
                flatMap((ids: string[]) =>
                    combineLatest(
                        ids.map((id) => {
                            return this.cardService.getSingleCard(id);
                        })
                    )
                ),
                tap((cards) => this.badgeCount = cards.length)
            );
    }
    createOrder() {
        this.profile$
            .pipe(
                take(1),
                debounceTime(1000),
                switchMap((userData) =>
                    this.orderService.createOrder({
                        order_date: new Date(),
                        sum: 50,
                        cart: userData.cart,
                        status: "active",
                        delivery_to: userData._id,
                        delivery_address: userData.address,
                        delivery_date: new Date(),
                        delivery_track: "12313",
                        delivery_status: "bearbeitung",
                    })
                ),
                tap((orderData: OrderInterface) =>
                    this.cartService.deleteOrdersFromCartByPatch({
                        cart: orderData.cart,
                    })
                )
            )
            .subscribe(() => location.reload());
    }

    onDeleteEvent(event) {
        this.ngOnInit();
    }
}
