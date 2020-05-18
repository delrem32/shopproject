import {Component, Input, OnInit} from '@angular/core';
import {CardInterface} from '../shared/cards/card-interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: CardInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
