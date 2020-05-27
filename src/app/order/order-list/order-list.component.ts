import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {ShoppingCartService} from '../../shopping-cart.service';
import {CardServiceService} from '../../card-service.service';
import {flatMap, map, pluck, scan, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  data = [];
  profile$ = this.profileService.profile$;
  cardsList$;

  constructor(private profileService: ProfileService, private orderService: ShoppingCartService,
              private cardService: CardServiceService) {

  }

  ngOnInit(): void {
    this.loadData(1);
    this.initCart();
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
