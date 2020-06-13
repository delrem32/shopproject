import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartFormComponent } from './cart-form/cart-form.component';
import {CartListComponent} from './cart-list/cart-list.component';
import {NzButtonModule, NzDividerModule, NzGridModule, NzListModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [CartFormComponent, CartListComponent],
  exports: [
    CartFormComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NzListModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule
  ]
})
export class CartModule { }
