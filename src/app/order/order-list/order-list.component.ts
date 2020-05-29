import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {ShoppingCartService} from '../../shopping-cart.service';
import {CardServiceService} from '../../card-service.service';
import {flatMap, map, pluck, scan, startWith, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Observable, ObservedValueOf, Subject} from 'rxjs';
import {CardInterface} from '../../shared/cards/card-interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  data = [];
  profile$ = this.profileService.profile$;
  cardsList$;
  refresh$ = new Subject() as Subject<CardInterface>;

  constructor(private profileService: ProfileService, private orderService: ShoppingCartService,
              private cardService: CardServiceService) {

  }

  ngOnInit(): void {
    this.initCart();
  }

  initCart() {
    // profile$ -> null ??
    this.cardsList$ = this.refresh$.asObservable().pipe(startWith(null))
      .pipe(
        flatMap(() => this.profileService.profile$),
        pluck('cart'),
        flatMap((ids: string[]) => combineLatest(
          ids.map(id => this.cardService.getSingleCard(id))
          )
        )
      );
  }

  deleteOrderFromCart(id: string) {
    return this.orderService.deleteOrdersFromCartByPatch({cart: [id]})
      .pipe(tap(() => this.refresh$.next()))
      .subscribe();
  }
}
