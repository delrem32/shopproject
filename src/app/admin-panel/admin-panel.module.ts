import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NzAffixModule} from 'ng-zorro-antd';
import { OrderManagementComponent } from './order-management/order-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';


@NgModule({
  declarations: [OrderManagementComponent, UserManagementComponent, RoleManagementComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    NzAffixModule
  ]
})
export class AdminPanelModule { }
