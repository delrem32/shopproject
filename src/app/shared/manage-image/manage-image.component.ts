import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FilesService } from "../../files.service";
import { DomSanitizer } from "@angular/platform-browser";
import { flatMap, map, share } from "rxjs/operators";

@Component({
    selector: "app-manage-image",
    templateUrl: "./manage-image.component.html",
    styleUrls: ["./manage-image.component.css"],
})
export class ManageImageComponent implements OnInit {
    @Input() id: string;
    src$: Observable<any>;
    constructor(
        private filesService: FilesService,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.src$ = this.filesService
            .fetchImag(this.id)
            .pipe(flatMap(this.filesService.readAsDataURL))
            .pipe(
                map((dataURL: string) => {
                    debugger;
                    return this.domSanitizer.bypassSecurityTrustUrl(dataURL);
                })
            )
            .pipe(share());
    }
}
