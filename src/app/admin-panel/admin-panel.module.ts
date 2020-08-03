import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminPanelRoutingModule } from "./admin-panel-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NzAffixModule } from "ng-zorro-antd";
import { OrderManagementComponent } from "./order-management/order-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { RoleManagementComponent } from "./role-management/role-management.component";
import { AntModule } from "../shared/ant/ant.module";
import { ManageImageComponent } from "../shared/manage-image/manage-image.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        OrderManagementComponent,
        UserManagementComponent,
        RoleManagementComponent,
    ],
    imports: [
        CommonModule,
        AdminPanelRoutingModule,
        ReactiveFormsModule,
        NzAffixModule,
        AntModule,
        SharedModule,
        FormsModule,
    ],
})
export class AdminPanelModule {}
