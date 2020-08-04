import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { CardInterface } from "../../shared/cards/card-interface";
import { tap, takeUntil } from "rxjs/operators";
import { OrderService } from "../../order.service";
import { ShoppingCartService } from "../../shopping-cart.service";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
    selector: "app-cart-form",
    templateUrl: "./cart-form.component.html",
    styleUrls: ["./cart-form.component.css"],
})
export class CartFormComponent implements OnInit, OnDestroy {
    @Input() card: CardInterface;
    private refresh$ = new Subject();
    destroy$ = new Subject<void>();
    @Input() editable: boolean;
    @Output() onDeleteEvent = new EventEmitter();
    constructor(private cartService: ShoppingCartService) {}

    ngOnInit(): void {}
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    deleteOrderFromCart(id: string) {
        return this.cartService
            .deleteOrdersFromCartByPatch({ cart: [id] })
            .pipe(tap(() => this.onDeleteEvent.emit('card delete')), takeUntil(this.destroy$))
            .subscribe();
    }
}
