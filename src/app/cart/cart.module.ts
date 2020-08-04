import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartFormComponent } from "./cart-form/cart-form.component";
import { CartListComponent } from "./cart-list/cart-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [CartFormComponent, CartListComponent],
    exports: [CartFormComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        SharedModule
    ],
})
export class CartModule {}
