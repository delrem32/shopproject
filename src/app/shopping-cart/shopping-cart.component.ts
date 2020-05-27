import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ProfileService, UserProfile} from '../profile.service';
import {Observable, of} from 'rxjs';
import {combineLatest, delay, filter, flatMap, pluck, scan, take, tap} from 'rxjs/operators';
import {CardInterface} from '../shared/cards/card-interface';
import {CardServiceService} from '../card-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cardsList$: Observable<CardInterface[]>;
  cards;

  constructor(private orderService: ShoppingCartService,
              private profileService: ProfileService,
              private cardService: CardServiceService) {
  }

  isLogged() {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.initCart();
  }
  ngOnDestroy(): void {
  }

  initCart() {
    // profile$ -> null ??
    this.cardsList$ = this.profileService.profile$
      .pipe(take(1))
      .pipe(pluck('cart'))
      .pipe(flatMap((data: string[]) => {
        return data;
      }))
      .pipe(flatMap((id: string) => {
        return this.cardService.getSingleCard(id);
      }))
      .pipe(scan((acc, data) => {
        return [...acc, data];
      }, []));
  }

  deleteOrderFromCart(id: string) {
    return this.orderService.deleteOrdersFromCartByPatch(id).subscribe();
  }
}
