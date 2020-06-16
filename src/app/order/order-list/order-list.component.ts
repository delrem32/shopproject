import {Component, OnInit} from '@angular/core';
import {OrderInterface} from '../../shared/orders/order-interface';
import {ProfileService} from '../../profile.service';
import {CardServiceService} from '../../card-service.service';
import {OrderService} from '../../order.service';
import {combineLatest, Observable, of, from} from 'rxjs';
import {CardInterface} from '../../shared/cards/card-interface';
import {filter, flatMap, map, partition, pluck, switchMap, tap, withLatestFrom, scan, take} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ordersList$: Observable<OrderInterface[]>;
  activeOrdersList$: any;
  completedOrdersList$: any;
  date = new Date();
  profileId$;
  constructor(private profileService: ProfileService,
              private cardService: CardServiceService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.ordersList$ = this.profileService.profile$.pipe(
      take(1),
      pluck('_id'),
      flatMap((id: string) => this.orderService.getOrdersByUser(id))
    );
    [this.activeOrdersList$, this.completedOrdersList$] = [
      this.ordersList$.pipe(
        map((orders) => orders.
        filter((order) => order.status === 'active')),
        map((orders: OrderInterface[])=>orders.map((order)=> [order, combineLatest(order.cart.map((cardId:string)=>this.cardService.getSingleCard(cardId)))])
        ),
        tap((data)=>console.log(data))
        ),
      this.ordersList$.pipe(
        map((orders) => orders.
        filter((order) => order.status === 'completed' || order.status === 'canceled')),
        map((orders: OrderInterface[])=>orders.map((order)=> [order, combineLatest(order.cart.map((cardId:string)=>this.cardService.getSingleCard(cardId)))])
        ),
        tap((data)=>console.log(data))
        )
    ];

    /*this.cardList$ = this.ordersList$.pipe(
      flatMap((orders) => orders),
      pluck('cart'),
      flatMap((ids: string[]) => combineLatest(
        ids.map(id => {
          return this.cardService.getSingleCard(id);
        })
        )
      )
    );*/
  }

}
