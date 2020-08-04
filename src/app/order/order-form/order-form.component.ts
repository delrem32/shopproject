import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderInterface } from "../../shared/orders/order-interface";
import { ProfileService } from "../../profile.service";
import { CardServiceService } from "../../card-service.service";
import { CardInterface } from "../../shared/cards/card-interface";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Component({
    selector: "app-order-form",
    templateUrl: "./order-form.component.html",
    styleUrls: ["./order-form.component.css"],
})
export class OrderFormComponent implements OnInit {
    @Input() order: [OrderInterface, CardInterface[]];
    @Input() admin: boolean = false;
    @Input() sent: boolean = false;
    @Output() statusEvent = new EventEmitter<{state:string, orderId: string}>();
    @Output() deliveryStatusEvent = new EventEmitter<{state:string, orderId: string}>();
    constructor() {}
    ngOnInit(): void {
        
    }

    onStatusChangeEvent(state: string, orderId: string) {
        console.log(state, orderId);
        this.statusEvent.emit({state: state, orderId: orderId});
    }
    onDeliveryStatusChangeEvent(state: string, orderId: string) {
        console.log(state, orderId);
        this.deliveryStatusEvent.emit({state: state, orderId: orderId});
    }
}
