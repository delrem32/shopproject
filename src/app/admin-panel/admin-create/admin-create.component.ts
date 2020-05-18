import {Component, OnInit} from '@angular/core';
import {CardServiceService} from '../../card-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CardInterface} from '../../shared/cards/card-interface';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  constructor(private cardService: CardServiceService,
              private route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
  }

  createCard(card: CardInterface) {
    this.cardService.createCard(card)
      .subscribe(() => this.router.navigate(['../..', 'admin'], {relativeTo: this.route}));
  }

}
