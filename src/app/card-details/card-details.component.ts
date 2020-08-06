import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { flatMap, map, switchMap, takeUntil, debounceTime, take } from "rxjs/operators";
import { CardServiceService } from "../card-service.service";
import { Observable, Subject, fromEvent } from "rxjs";
import { CardInterface } from "../shared/cards/card-interface";
import { ShoppingCartService } from "../shopping-cart.service";


@Component({
    selector: "app-card-details",
    templateUrl: "./card-details.component.html",
    styleUrls: ["./card-details.component.css"],
})
export class CardDetailsComponent implements OnInit, OnDestroy {
    array = [1, 2, 3, 4];
    effect = "scrollx";
    card$: Observable<CardInterface>;
    destroy$ = new Subject<void>();
    

    constructor(
        private route: ActivatedRoute,
        private cardService: CardServiceService,
        private orderService: ShoppingCartService
    ) {}
    
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.card$ = this.route.paramMap
            .pipe(map((params) => params.get("id")))
            .pipe(
                switchMap((id: string) => this.cardService.getSingleCard(id))
            );

    
    }

    addToOrderList(id: string) {
         this.orderService
            .patchOrdersFromCart({ cart: [id] })
            .pipe(debounceTime(1000), take(1))
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }
}
