import { Component, OnInit, OnDestroy } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadChangeParam, UploadFile } from "ng-zorro-antd/upload";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { ProfileService, UserProfile } from "../../profile.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { takeUntil, startWith, switchMap } from "rxjs/operators";
@Component({
    selector: "app-user-management",
    templateUrl: "./user-management.component.html",
    styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit, OnDestroy {
    profiles$: Observable<[UserProfile]>;
    isVisible = false;
    radioValue = "admin";
    private destroy$ = new Subject<void>();
    refresh$ = new BehaviorSubject(undefined);
    targetId: string;
    constructor(private profileService: ProfileService) {}
    ngOnInit() {
        this.profiles$ = this.refresh$
            .pipe(startWith(undefined))
            .pipe(switchMap(() => this.profileService.getAllProfiles()));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    showModal(id: string, role: string): void {
        this.isVisible = true;
        this.radioValue = role;
        this.targetId = id;
    }

    handleEvent(event: string) {
        console.log(event, "asd");
        this.radioValue = event;
    }

    handleOk(): void {
        console.log("Button ok clicked!");
        this.isVisible = false;
        this.profileService
            .patchProfile(this.targetId, { role: this.radioValue })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.refresh$.next(undefined));
    }

    handleCancel(): void {
        console.log("Button cancel clicked!");
        this.isVisible = false;
    }
}
