import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { MainmenuComponent } from "./mainmenu/mainmenu.component";
import { CardItemComponent } from "./card-item/card-item.component";
import { CardListComponent } from "./card-list/card-list.component";
import { CardDetailsComponent } from "./card-details/card-details.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CardsModule } from "./cards/cards.module";
import { AdminPanelModule } from "./admin-panel/admin-panel.module";
import {
    NzBadgeModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzCheckboxModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzNotificationModule,
    NzSelectModule,
    NzTabsModule,
    NzToolTipModule,
} from "ng-zorro-antd";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserLoginComponent } from "./user-login/user-login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { JwtInterceptor } from "./jwt.interceptor";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ShoppingCartComponent } from "./cart/shopping-cart/shopping-cart.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NewsComponent,
        MainmenuComponent,
        CardListComponent,
        CardDetailsComponent,
        CardItemComponent,
        UserLoginComponent,
        UserRegistrationComponent,
        UserProfileComponent,
        ShoppingCartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CardsModule,
        AdminPanelModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    exports: [CardListComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
