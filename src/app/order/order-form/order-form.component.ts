import {Component, Input, OnInit} from '@angular/core';
import {OrderInterface} from '../../shared/orders/order-interface';
import {ProfileService} from '../../profile.service';
import {CardServiceService} from '../../card-service.service';
import {CardInterface} from '../../shared/cards/card-interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() order: OrderInterface;
  @Input() order2: OrderInterface;
  @Input() orderCards$: Observable<CardInterface[]>;


  constructor() {

  }
  ngOnInit(): void {

  }

}
