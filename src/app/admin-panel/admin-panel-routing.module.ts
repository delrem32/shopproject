import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderManagementComponent } from "./order-management/order-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { RoleManagementComponent } from "./role-management/role-management.component";
import { IsAdminGuard } from "../is-admin.guard";
import { IsAuthorizedGuard } from "../is-authorized.guard";

const routes: Routes = [
    {
        path: "card-management",
        loadChildren: () =>
            import("./card-management/card-management.module").then(
                (m) => m.CardManagementModule
            ),
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "order-management",
        component: OrderManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "order-management/:id",
        component: OrderManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "user-management",
        component: UserManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "user-management/:id",
        component: UserManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "role-management",
        component: RoleManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "role-management/:id",
        component: RoleManagementComponent,
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
