import { Component } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadChangeParam, UploadFile } from "ng-zorro-antd/upload";
import { HttpClient, HttpRequest } from "@angular/common/http";

@Component({
    selector: "app-user-management",
    templateUrl: "./user-management.component.html",
    styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent {
    constructor(private msg: NzMessageService, private http: HttpClient) {}
    url = "http://localhost:5000/files";
    handleUpload = (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        const req = new HttpRequest(
            "POST",
            "http://localhost:5000/files",
            formData,
            {
                reportProgress: true,
            }
        );
    };

    handleChange(info: UploadChangeParam): void {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            this.msg.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            this.msg.error(`${info.file.name} file upload failed.`);
        }
    }
}
