import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import {NzIconModule, NzListModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzListModule,
    NzIconModule
  ]
})
export class OrderModule { }
