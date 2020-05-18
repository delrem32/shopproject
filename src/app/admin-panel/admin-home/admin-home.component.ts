import { Component, OnInit } from '@angular/core';
import {CardServiceService} from '../../card-service.service';
import {Observable, Subject} from 'rxjs';
import {CardInterface} from '../../shared/cards/card-interface';
import {flatMap, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  refreshSubj = new Subject();
  cardsList$: Observable<CardInterface[]>;
  constructor(private cardService: CardServiceService) { }

  ngOnInit(): void {
    this.cardsList$ = this.refreshSubj.asObservable().pipe(startWith(null)).pipe(flatMap(() => this.cardService.getCards()));
  }

  deleteCard(id: string) {
    if (confirm('Buch wirklich löschen?')) {
      this.cardService.deleteCard(id).subscribe();
      this.refreshSubj.next();
    }
  }
}
