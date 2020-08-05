import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartFormComponent } from "./cart-form/cart-form.component";
import { CartListComponent } from "./cart-list/cart-list.component";
import { SharedModule } from "../shared/shared.module";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

@NgModule({
    declarations: [CartFormComponent, CartListComponent,
        ShoppingCartComponent],
    exports: [CartFormComponent, ShoppingCartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        SharedModule
    ],
})
export class CartModule {}
