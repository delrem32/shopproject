import {Component, OnInit} from '@angular/core';
import {OrderInterface} from '../../shared/orders/order-interface';
import {ProfileService} from '../../profile.service';
import {CardServiceService} from '../../card-service.service';
import {OrderService} from '../../order.service';
import {combineLatest, Observable} from 'rxjs';
import {CardInterface} from '../../shared/cards/card-interface';
import {filter, flatMap, map, partition, pluck, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ordersList$: Observable<OrderInterface[]>;
  activeCardList$: Observable<CardInterface[]>;
  completedCardList$: Observable<CardInterface[]>;
  activeOrdersList$: Observable<OrderInterface[]>;
  completedOrdersList$: Observable<OrderInterface[]>;
  date = new Date();

  constructor(private profileService: ProfileService,
              private cardService: CardServiceService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.ordersList$ = this.orderService.getOrders();
    [this.activeOrdersList$, this.completedOrdersList$] = [
      this.ordersList$.pipe(
        map((orders) => orders.filter((order) => order.status === 'active')
        )),
      this.ordersList$.pipe(
        map((orders) => orders
          .filter((order) => order.status === 'completed' || order.status === 'canceled')
        ))
    ];
    this.activeCardList$ = this.activeOrdersList$.pipe(
      flatMap((orders) => orders
        .map((order) => combineLatest(order.cart
            .map((cardId) => this.cardService.getSingleCard(cardId))
          )
        )
      ),
      flatMap((cards) => cards)
    );
    this.completedCardList$ = this.completedOrdersList$.pipe(
      flatMap((orders) => orders
        .map((order) => combineLatest(order.cart
            .map((cardId) => this.cardService.getSingleCard(cardId))
          )
        )
      ),
      flatMap((cards) => cards)
    );

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
