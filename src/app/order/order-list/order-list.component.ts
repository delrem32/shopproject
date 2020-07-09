import { Component, OnInit } from "@angular/core";
import { OrderInterface } from "../../shared/orders/order-interface";
import { ProfileService } from "../../profile.service";
import { CardServiceService } from "../../card-service.service";
import { OrderService } from "../../order.service";
import { combineLatest, Observable, of, from } from "rxjs";
import { CardInterface } from "../../shared/cards/card-interface";
import {
    filter,
    flatMap,
    map,
    partition,
    pluck,
    switchMap,
    tap,
    withLatestFrom,
    scan,
    take,
    reduce,
} from "rxjs/operators";
import { LoginService } from "../../login.service";

@Component({
    selector: "app-order-list",
    templateUrl: "./order-list.component.html",
    styleUrls: ["./order-list.component.css"],
})
export class OrderListComponent implements OnInit {
    ordersList$: Observable<OrderInterface[]>;
    activeOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    completedOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    date = new Date();

    constructor(
        private cardService: CardServiceService,
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        this.ordersList$ = this.orderService.getOrdersByUser(
            localStorage.getItem("profileId")
        );
        [this.activeOrdersList$, this.completedOrdersList$] = [
            this.ordersList$.pipe(
                map((orders: OrderInterface[]) =>
                    orders.filter(
                        (order: OrderInterface) => order.status === "active"
                    )
                ),
                flatMap((orders: OrderInterface[]) => from(orders)),
                flatMap((order: OrderInterface) =>
                    combineLatest([
                        of(order),
                        ...order.cart.map((cardId: string) =>
                            this.cardService.getSingleCard(cardId)
                        ),
                    ])
                ),
                reduce(
                    (
                        acc,
                        [order, ...cart]: [OrderInterface, CardInterface]
                    ) => [...acc, [order, cart]],
                    new Array<[OrderInterface, CardInterface[]]>()
                )
            ),
            this.ordersList$.pipe(
                map((orders) =>
                    orders.filter(
                        (order) =>
                            order.status === "completed" ||
                            order.status === "canceled"
                    )
                ),
                flatMap((orders) => from(orders)),
                flatMap((order) =>
                    combineLatest([
                        of(order),
                        ...order.cart.map((cardId) =>
                            this.cardService.getSingleCard(cardId)
                        ),
                    ])
                ),
                reduce(
                    (
                        acc,
                        [order, ...cart]: [OrderInterface, CardInterface]
                    ) => [...acc, [order, cart]],
                    new Array<[OrderInterface, CardInterface[]]>()
                )
            ),
        ];
    }
}
