import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ProfileService, UserProfile} from '../profile.service';
import {Observable, of} from 'rxjs';
import {combineLatest, filter, flatMap, pluck, scan, take, tap} from 'rxjs/operators';
import {CardInterface} from '../shared/cards/card-interface';
import {CardServiceService} from '../card-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  profile$ = this.profileService.profile$;
  cardsList$: Observable<CardInterface[]>;

  constructor(private orderService: ShoppingCartService,
              private profileService: ProfileService,
              private cardService: CardServiceService) {
  }

  ngOnInit(): void {
    this.cardsList$ = this.profile$
      .pipe(tap((data) => {
        debugger;
        return console.log(data);
      }))
      .pipe(take(1))
      .pipe(pluck('cart'))
      .pipe(flatMap((data: string[]) => {
        debugger;
        return data;
      }))
      .pipe(tap((id: string) => {
        return this.cardService.getSingleCard(id);
      }))
      .pipe(scan((acc, data) => {
        debugger;
        return [...acc, data];
      }, []));
  }

  deleteOrderFromCart(id: string) {
    return this.orderService.deleteOrdersFromCartByPatch(id).subscribe();
  }
}
