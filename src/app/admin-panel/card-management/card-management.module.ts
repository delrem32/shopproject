import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CardManagementRoutingModule } from "./card-management-routing.module";
import { CardCreateComponent } from "./card-create/card-create.component";
import { CardListComponent } from "./card-list/card-list.component";
import { CardEditComponent } from "./card-edit/card-edit.component";
import { CardFormComponent } from "./card-form/card-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NzAffixModule } from "ng-zorro-antd";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        CardCreateComponent,
        CardEditComponent,
        CardFormComponent,
        CardListComponent,
    ],
    imports: [
        CommonModule,
        CardManagementRoutingModule,
        ReactiveFormsModule,
        NzAffixModule,
        SharedModule
    ],
})
export class CardManagementModule {}
