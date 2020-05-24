import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {CardServiceService} from '../card-service.service';
import {Observable, Subject} from 'rxjs';
import {CardInterface} from '../shared/cards/card-interface';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  card$: Observable<CardInterface>;

  constructor(private route: ActivatedRoute, private cardService: CardServiceService) {
  }

  ngOnInit(): void {
    this.card$ = this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .pipe(switchMap((id: string) => this.cardService.getSingleCard(id)));
  }

}
