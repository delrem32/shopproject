import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderManagementComponent } from "./order-management/order-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { RoleManagementComponent } from "./role-management/role-management.component";

const routes: Routes = [
    {
        path: "card-management",
        loadChildren: () =>
            import("./card-management/card-management.module").then(
                (m) => m.CardManagementModule
            ),
    },
    { path: "order-management", component: OrderManagementComponent },
    { path: "order-management/:id", component: OrderManagementComponent },
    { path: "user-management", component: UserManagementComponent },
    { path: "user-management/:id", component: UserManagementComponent },
    { path: "role-management", component: RoleManagementComponent },
    { path: "role-management/:id", component: RoleManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
