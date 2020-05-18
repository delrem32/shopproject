import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import {NzAffixModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [AdminHomeComponent, AdminEditComponent, AdminCreateComponent, AdminFormComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    NzAffixModule
  ]
})
export class AdminPanelModule { }
