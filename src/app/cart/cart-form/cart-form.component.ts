import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from '../../shared/cards/card-interface';
import {tap} from 'rxjs/operators';
import {OrderService} from '../../order.service';
import {ShoppingCartService} from '../../shopping-cart.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {
  @Input() card: CardInterface;
  private refresh$ = new Subject();
  @Input() editable: boolean;
  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
  }

  deleteOrderFromCart(id: string) {
    return this.cartService.deleteOrdersFromCartByPatch({cart: [id]})
      .pipe(tap(() => this.refresh$.next()))
      .subscribe();
  }
}
