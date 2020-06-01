import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import {NzIconModule, NzListModule} from 'ng-zorro-antd';
import { OrderActiveComponent } from './order-active/order-active.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';
import { OrderFormComponent } from './order-form/order-form.component';


@NgModule({
  declarations: [OrderListComponent, OrderActiveComponent, OrderCompletedComponent, OrderFormComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzListModule,
    NzIconModule
  ]
})
export class OrderModule { }
