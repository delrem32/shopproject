import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardServiceService } from "../../../card-service.service";
import { CardInterface } from "../../../shared/cards/card-interface";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

@Component({
    selector: "app-card-edit",
    templateUrl: "./card-edit.component.html",
    styleUrls: ["./card-edit.component.css"],
})
export class CardEditComponent implements OnInit {
    card$: Observable<CardInterface>;
    cardId: string;

    constructor(
        private cardService: CardServiceService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.card$ = this.route.paramMap
            .pipe(
                map((params) => {
                    this.cardId = params.get("_id");
                    return params.get("_id");
                })
            )
            .pipe(
                switchMap((id: string) => this.cardService.getSingleCard(id))
            );
    }

    updateCard(card: CardInterface) {
        this.cardService.updateCard(this.cardId, card).subscribe(() => {
            return this.router.navigate(["../../..", "card-management"], {
                relativeTo: this.route,
            });
        });
    }
}
