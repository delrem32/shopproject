import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderListComponent } from "./order-list/order-list.component";
import {
    NzButtonModule,
    NzCollapseModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzTabsModule,
} from "ng-zorro-antd";
import { OrderFormComponent } from "./order-form/order-form.component";
import { CartModule } from "../cart/cart.module";

@NgModule({
    declarations: [OrderListComponent, OrderListComponent, OrderFormComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        NzListModule,
        NzIconModule,
        NzGridModule,
        NzDividerModule,
        NzButtonModule,
        NzCollapseModule,
        CartModule,
        NzTabsModule,
    ],
    exports: [OrderFormComponent]
})
export class OrderModule {}
