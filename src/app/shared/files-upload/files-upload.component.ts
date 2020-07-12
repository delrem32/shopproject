import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from "ng-zorro-antd/message";
import { UploadFile, UploadChangeParam } from "ng-zorro-antd/upload";
import { FilesService } from '../../files.service';
import { tap, map, flatMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnDestroy {
  uploading = false;
  fileList: UploadFile[] = [];
  previewVisible = false;
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private msg: NzMessageService,private filesService: FilesService) {}
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  beforeUpload = (file: UploadFile): boolean => {
      this.fileList = this.fileList.concat(file);
      return false;
  };

  handleUpload(): void {
      const formData = new FormData();

      this.fileList.forEach(
          (file: any) => this.filesService.postImage(file)
          .pipe(tap((ids)=>console.log(ids)))
          .pipe(takeUntil(this.destroy$))
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
          )
      )

  }

}
