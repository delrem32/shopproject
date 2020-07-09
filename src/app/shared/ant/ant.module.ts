import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AntRoutingModule } from "./ant-routing.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
    declarations: [],
    imports: [CommonModule, AntRoutingModule],
    exports: [NgZorroAntdModule],
})
export class AntModule {}
