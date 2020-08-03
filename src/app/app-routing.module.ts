import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CardDetailsComponent } from "./card-details/card-details.component";
import { IsAuthorizedGuard } from "./is-authorized.guard";
import { IsAdminGuard } from "./is-admin.guard";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "news", component: NewsComponent },
    { path: "card/:id", component: CardDetailsComponent },
    {
        path: "admin",
        loadChildren: () =>
            import("./admin-panel/admin-panel.module").then(
                (m) => m.AdminPanelModule
            ),
        canActivate: [IsAdminGuard, IsAuthorizedGuard],
    },
    {
        path: "order",
        loadChildren: () =>
            import("./order/order.module").then((order) => order.OrderModule),
        canActivate: [IsAuthorizedGuard, IsAdminGuard],
    },
    {
        path: "cart",
        loadChildren: () =>
            import("./cart/cart.module").then((cart) => cart.CartModule),
        canActivate: [IsAuthorizedGuard],
    },
    { path: "register", component: UserRegistrationComponent },
    {
        path: "profile/:id",
        component: UserProfileComponent,
        canActivate: [IsAuthorizedGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
