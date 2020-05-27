import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {ShoppingCartService} from '../../shopping-cart.service';
import {CardServiceService} from '../../card-service.service';
import {flatMap, map, pluck, scan, startWith, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
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
    this.loadData(1);
    this.initCart();
  }

  initCart() {
    // profile$ -> null ??
    this.cardsList$ = this.refresh$.asObservable().pipe(startWith(null))
      .pipe(take(1))
      .pipe(flatMap(() => this.profileService.profile$))
      .pipe(take(1))
      .pipe(pluck('cart'))
      .pipe(flatMap((ids: string[]) => combineLatest(
        ids.map(id => this.cardService.getSingleCard(id)))));
  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `ant design part ${index} (page: ${pi})`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources ' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      };
    });
  }
}
