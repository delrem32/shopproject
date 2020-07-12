import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadFile, UploadChangeParam } from "ng-zorro-antd/upload";
import { filter } from "rxjs/operators";
import { FilesService } from "../../files.service";

@Component({
    selector: "app-order-management",
    templateUrl: "./order-management.component.html",
    styleUrls: ["./order-management.component.css"],
})
export class OrderManagementComponent {
    
}
