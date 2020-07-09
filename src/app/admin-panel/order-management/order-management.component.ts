import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadFile, UploadChangeParam } from "ng-zorro-antd/upload";
import { filter } from "rxjs/operators";

@Component({
    selector: "app-order-management",
    templateUrl: "./order-management.component.html",
    styleUrls: ["./order-management.component.css"],
})
export class OrderManagementComponent {
    uploading = false;
    fileList: UploadFile[] = [];

    constructor(private http: HttpClient, private msg: NzMessageService) {}

    beforeUpload = (file: UploadFile): boolean => {
        this.fileList = this.fileList.concat(file);
        return false;
    };

    handleUpload(): void {
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        this.fileList.forEach((file: any) => {
            formData.append("file", file);
        });
        this.uploading = true;
        // You can use any AJAX library you like
        const req = new HttpRequest(
            "POST",
            "http://localhost:5000/files",
            formData,
            {
                reportProgress: true,
            }
        );
        this.http
            .request(req)
            .pipe(filter((e) => e instanceof HttpResponse))
            .subscribe(
                () => {
                    this.uploading = false;
                    this.fileList = [];
                    this.msg.success("upload successfully.");
                },
                () => {
                    this.uploading = false;
                    this.msg.error("upload failed.");
                }
            );
    }
}
