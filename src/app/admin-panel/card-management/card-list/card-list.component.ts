import { Component, OnInit } from '@angular/core';
import {CardServiceService} from '../../../card-service.service';
import {Observable, Subject} from 'rxjs';
import {CardInterface} from '../../../shared/cards/card-interface';
import {flatMap, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  refreshSubj = new Subject();
  cardsList$: Observable<CardInterface[]>;
  constructor(private cardService: CardServiceService) { }

  ngOnInit(): void {
    this.cardsList$ = this.refreshSubj.asObservable()
    .pipe(startWith(null))
    .pipe(flatMap(() => {
      return this.cardService.getCards()}));
  }

  deleteCard(id: string) {
    if (confirm('Card wirklich löschen?')) {
      this.cardService.deleteCard(id).subscribe();
      return this.refreshSubj.next();
    }
  }
}
