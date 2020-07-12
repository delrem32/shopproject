import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from "@angular/core";
import { CardInterface } from "../../../shared/cards/card-interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardServiceService } from "../../../card-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-card-form",
    templateUrl: "./card-form.component.html",
    styleUrls: ["./card-form.component.css"],
})
export class CardFormComponent implements OnInit, OnChanges {
    @Input() card: CardInterface;
    @Input() editing: false;
    @Output() submitCard = new EventEmitter<CardInterface>();
    cardForm: FormGroup;
    filesSet = new Set();

    downloadedFiles(fileId: string) {
        this.filesSet.add(fileId);
        console.log(this.filesSet);
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formInit();
    }

    ngOnChanges(): void {
        this.formInit();
        this.setCardValue(this.card);
    }

    formInit() {
        if (this.cardForm) {
            return;
        }
        this.cardForm = this.fb.group({
            _id: [{ value: "", disabled: true }],
            name: ["", Validators.required],
            description: ["", Validators.required],
            type: ["", Validators.required],
            quantity: [0],
        });
    }

    submitForm() {
        const formValue = this.cardForm.value;
        const id = this.editing ? this.card._id : formValue._id;
        const newCard: CardInterface = {
            ...formValue,
            id,
            files: [...this.filesSet]
        };
        /*
         */
        this.submitCard.emit(newCard);
        this.cardForm.reset();
    }

    private setCardValue(card: CardInterface) {
        if(card.files.length !== 0) {
            card.files.forEach((fileId: string) => this.filesSet.add(fileId));
            return this.cardForm.patchValue(card);
        } else {
            return this.cardForm.patchValue(card);
        }
        
    }
}
