import {Component, OnInit} from '@angular/core';
import {CardServiceService} from '../../../card-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CardInterface} from '../../../shared/cards/card-interface';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  constructor(private cardService: CardServiceService,
              private route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
  }

  createCard(card: CardInterface) {
    this.cardService.createCard(card)
      .subscribe(() => this.router.navigate(['../..', 'card-management'], {relativeTo: this.route}));
  }

}
