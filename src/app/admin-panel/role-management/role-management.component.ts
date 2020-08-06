import { Component, OnInit } from "@angular/core";
import { ResponsiveService } from "../../responsive.service";

@Component({
    selector: "app-role-management",
    templateUrl: "./role-management.component.html",
    styleUrls: ["./role-management.component.css"],
})
export class RoleManagementComponent implements OnInit {
    mediaController$;
    constructor(private responsiveService: ResponsiveService) {}

    ngOnInit(): void {
        this.mediaController$ = this.responsiveService.mediaBreakpoint$;
    }
}
