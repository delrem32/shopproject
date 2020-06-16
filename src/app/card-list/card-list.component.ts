import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CardInterface} from '../shared/cards/card-interface';
import {CardServiceService} from '../card-service.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cardsList$: Observable<CardInterface[]>;
  constructor(private cardService: CardServiceService) { }

  ngOnInit(): void {
    this.cardsList$ = this.cardService.getCards().pipe(
      map((cards: CardInterface[]) => cards.filter((card: CardInterface)=> card.quantity > 0))
    );
  }

}
