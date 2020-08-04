import {
    HttpClient,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadFile, UploadChangeParam } from "ng-zorro-antd/upload";
import { filter, flatMap, reduce, map, takeUntil, startWith, tap } from "rxjs/operators";
import { FilesService } from "../../files.service";
import { combineLatest, of, from, Observable, Subject, BehaviorSubject } from "rxjs";
import { OrderInterface } from "../../shared/orders/order-interface";
import { CardInterface } from "../../shared/cards/card-interface";
import { CardServiceService } from "../../card-service.service";
import { OrderService } from "../../order.service";

@Component({
    selector: "app-order-management",
    templateUrl: "./order-management.component.html",
    styleUrls: ["./order-management.component.css"],
})
export class OrderManagementComponent implements OnDestroy {
    ordersList$: Observable<OrderInterface[]>;
    activeOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    sentOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    completedOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    canceledOrdersList$: Observable<[OrderInterface, CardInterface[]][]>;
    //refresh$ = new BehaviorSubject(null);
    date = new Date();
    destroy$ = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    constructor(
        private cardService: CardServiceService,
        private orderService: OrderService
    ) {}
    
    statusManager(event: {state, orderId}) {
        console.log("state is: ", event.state, "id is: ", event.orderId);
        this.orderService.updateOrder(event.orderId, {status: event.state})
        .pipe(takeUntil(this.destroy$)).subscribe(()=> this.ngOnInit());
        //this.refresh$.next(null)
    }

    deliveryStatusManager(event: {state, orderId}) {
        console.log("state is: ", event.state, "id is: ", event.orderId);
        this.orderService.updateOrder(event.orderId, {delivery_status: event.state})
        .pipe(takeUntil(this.destroy$)).subscribe(()=> this.ngOnInit());
        //this.refresh$.next(null)
    }

    ngOnInit(): void {
        this.ordersList$ = this.orderService.getOrders();
        [this.activeOrdersList$, this.completedOrdersList$, this.canceledOrdersList$] = [
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
                            order.status === "completed"
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
            this.ordersList$.pipe(
                map((orders) =>
                    orders.filter(
                        (order) =>
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
            )
        ];
    }
}
