import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesUploadComponent } from "./files-upload/files-upload.component";
import { AntModule } from "./ant/ant.module";
import { ManageImageComponent } from "./manage-image/manage-image.component";

@NgModule({
    declarations: [FilesUploadComponent, ManageImageComponent],
    imports: [CommonModule, AntModule],
    exports: [AntModule, ManageImageComponent, FilesUploadComponent],
})
export class SharedModule {}
