import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {ShoppingCartService} from '../../shopping-cart.service';
import {CardServiceService} from '../../card-service.service';
import {filter, flatMap, map, pluck, scan, startWith, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Observable, ObservedValueOf, Subject} from 'rxjs';
import {CardInterface} from '../../shared/cards/card-interface';
import {OrderInterface} from '../../shared/orders/order-interface';
import {OrderService} from '../../order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  data = [];
  profile$ = this.profileService.profile$;
  cardsList$: Observable<CardInterface[]>;
  refresh$ = new Subject() as Subject<CardInterface>;

  constructor(
    private profileService: ProfileService,
    private cardService: CardServiceService,
    private orderService: OrderService,
    private cartService: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initCart();
  }

  initCart() {
    this.cardsList$ = this.refresh$.asObservable().pipe(startWith(null))
      .pipe(
        flatMap(() => this.profileService.profile$),
        pluck('cart'),
        filter((ids: string[]) => ids.length > 0),
        flatMap((ids: string[]) => combineLatest(
          ids.map(id => {
            return this.cardService.getSingleCard(id);
          })
          )
        )
      );
  }

  createOrder() {
    this.profile$
      .pipe(
        take(1),
        switchMap((userData) => this.orderService.createOrder(
          {
            order_date: new Date(),
            sum: 50,
            cart: userData.cart,
            status: 'active',
            delivery_to: userData._id,
            delivery_address: userData.address,
            delivery_date: new Date(),
            delivery_track: '12313',
            delivery_status: 'bearbeitung'
          }
        )),
        tap((orderData: OrderInterface) => this.cartService.deleteOrdersFromCartByPatch({cart: orderData.cart}))
      )
      .subscribe(() => location.reload());
  }
}
